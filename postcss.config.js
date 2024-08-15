const path = require('node:path')

module.exports = ({ file }) => {
  const filename = { file }.file
  const designWidth = filename.includes(path.join('node_modules', 'vant'))
    ? 375
    : 750
  return {
    plugins: {
      // 使用 cnjm-postcss-px-to-viewport 规避 postcss.plugin was deprecated 警告
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        // 区分vant设计以375为基准。实际项目ui为750的情况
        viewportWidth: designWidth,
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [],
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 568,
      },
      autoprefixer: {
        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'],
      },
    },
  }
}
