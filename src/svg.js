export default class SVG_dimensions {
  constructor(svg_el, x_margin = 0.05, y_margin = 0.05) {
      const chart_info = document.getElementById(svg_el).getBoundingClientRect();
      const w = chart_info.width;
      const h = chart_info.height;

      this.dimensions = {
        w:w,
        h:h,
        margin_x: x_margin * w,
        margin_y: y_margin * h,
        width: w - 2 * (x_margin * w),
        height: h - 2 * (y_margin * h),
        x: chart_info.x,
        y: chart_info.y
      }

      return this.dimensions;
  }

  svg_dimensions() {
    return this.dimensions;
  }
}
