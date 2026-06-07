<?php
/**
 * WPZOOM Portfolio Layout - Elementor widget.
 *
 * Lets the user pick a saved "Portfolio Layout" (the `portfolio_layout` custom
 * post type) and render it anywhere via Elementor. The actual markup is produced
 * by the same code path as the Gutenberg "Portfolio Layouts" block / the
 * `[wpzoom_portfolio_layout]` shortcode, so output stays consistent everywhere.
 *
 * @since   1.4.27
 * @package WPZOOM_Portfolio
 */

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Class WPZOOM_Portfolio_Layout_Widget
 *
 * @since 1.4.27
 */
class WPZOOM_Portfolio_Layout_Widget extends Widget_Base {

	/**
	 * Widget name (machine slug).
	 *
	 * @since 1.4.27
	 * @return string
	 */
	public function get_name() {
		return 'wpzoom-portfolio-layout';
	}

	/**
	 * Widget title shown in the panel.
	 *
	 * @since 1.4.27
	 * @return string
	 */
	public function get_title() {
		return esc_html__( 'Portfolio Layout', 'wpzoom-portfolio' );
	}

	/**
	 * Widget icon.
	 *
	 * @since 1.4.27
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	/**
	 * Widget categories.
	 *
	 * @since 1.4.27
	 * @return array
	 */
	public function get_categories() {
		return array( 'wpzoom-portfolio' );
	}

	/**
	 * Search keywords for the panel.
	 *
	 * @since 1.4.27
	 * @return array
	 */
	public function get_keywords() {
		return array( 'portfolio', 'wpzoom', 'layout', 'gallery', 'grid', 'projects' );
	}

	/**
	 * Style dependencies.
	 *
	 * Declared here so Elementor loads them in the editor preview too; on the
	 * frontend the portfolio block style is also auto-enqueued by render_block().
	 * Loaded only when the widget is actually present on the page.
	 *
	 * @since 1.4.27
	 * @return string[]
	 */
	public function get_style_depends() {
		return array( 'wpzoom-blocks-css-style-portfolio' );
	}

	/**
	 * Script dependencies.
	 *
	 * @since 1.4.27
	 * @return string[]
	 */
	public function get_script_depends() {
		return array( 'jquery', 'masonry', 'imagesloaded' );
	}

	/**
	 * Get the list of saved Portfolio Layouts for the select control.
	 *
	 * @since 1.4.27
	 * @return array Map of post ID => post title.
	 */
	protected function get_portfolio_layouts() {
		$options = array();

		$layouts = get_posts(
			array(
				'post_type'        => 'portfolio_layout',
				'post_status'      => 'publish',
				'numberposts'      => -1,
				'orderby'          => 'title',
				'order'            => 'ASC',
				'suppress_filters' => false,
			)
		);

		foreach ( $layouts as $layout ) {
			$title             = '' !== trim( $layout->post_title ) ? $layout->post_title : sprintf( /* translators: %d: layout ID. */ esc_html__( '(no title) #%d', 'wpzoom-portfolio' ), $layout->ID );
			$options[ $layout->ID ] = $title;
		}

		return $options;
	}

	/**
	 * Register the widget controls.
	 *
	 * @since 1.4.27
	 * @return void
	 */
	protected function register_controls() {
		$this->start_controls_section(
			'section_content',
			array(
				'label' => esc_html__( 'Portfolio Layout', 'wpzoom-portfolio' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			)
		);

		$layouts = $this->get_portfolio_layouts();

		if ( empty( $layouts ) ) {
			$this->add_control(
				'no_layouts_notice',
				array(
					'type'            => Controls_Manager::RAW_HTML,
					'raw'             => sprintf(
						/* translators: 1: opening anchor tag, 2: closing anchor tag. */
						esc_html__( 'No portfolio layouts found yet. %1$sCreate your first layout%2$s, then come back and select it here.', 'wpzoom-portfolio' ),
						'<a href="' . esc_url( admin_url( 'post-new.php?post_type=portfolio_layout' ) ) . '" target="_blank">',
						'</a>'
					),
					'content_classes' => 'elementor-panel-alert elementor-panel-alert-info',
				)
			);
		} else {
			$this->add_control(
				'layout_id',
				array(
					'label'       => esc_html__( 'Select Layout', 'wpzoom-portfolio' ),
					'type'        => Controls_Manager::SELECT2,
					'options'     => $layouts,
					'default'     => '',
					'label_block' => true,
					'description' => esc_html__( 'Choose a saved Portfolio Layout to display.', 'wpzoom-portfolio' ),
				)
			);
		}

		$this->end_controls_section();
	}

	/**
	 * Render the widget output on the frontend (and in the editor preview).
	 *
	 * @since 1.4.27
	 * @return void
	 */
	protected function render() {
		$settings  = $this->get_settings_for_display();
		$layout_id = ! empty( $settings['layout_id'] ) ? absint( $settings['layout_id'] ) : 0;

		if ( ! $layout_id ) {
			if ( \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
				printf(
					'<div class="wpzoom-portfolio-layout-placeholder elementor-alert elementor-alert-info">%s</div>',
					esc_html__( 'Please select a Portfolio Layout from the panel on the left.', 'wpzoom-portfolio' )
				);
			}

			return;
		}

		// The plugin only enqueues its frontend script (category filtering,
		// masonry layout and AJAX "Load More") when it detects a portfolio
		// block/shortcode in the post content. On an Elementor page the layout
		// lives in _elementor_data and the shortcode is generated here at render
		// time, so that detection never fires — force the assets to load.
		if ( class_exists( 'WPZOOM_Portfolio_Assets_Manager' ) ) {
			WPZOOM_Portfolio_Assets_Manager::instance()->enqueue_portfolio_assets();
		}

		// Render through the existing shortcode so output and asset enqueuing
		// match the Gutenberg "Portfolio Layouts" block exactly. The portfolio
		// block style is auto-enqueued by render_block() inside the shortcode.
		$html = do_shortcode( sprintf( '[wpzoom_portfolio_layout id="%d"]', $layout_id ) );

		// Elementor's global Image Lightbox auto-opens any link to an image file
		// inside Elementor content. The portfolio already uses its own Magnific
		// Popup lightbox, so without this both fire and the visitor sees two
		// stacked lightboxes. Opt the plugin's image links out of Elementor's
		// lightbox; scoped to this widget so non-Elementor output is unaffected.
		$html = str_replace( 'class="mfp-image', 'data-elementor-open-lightbox="no" class="mfp-image', $html );

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Rendered, trusted block content from do_shortcode().
		echo $html;
	}
}
