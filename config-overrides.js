const { override, addDecoratorsLegacy, overrideDevServer, addLessLoader, addPostcssPlugins } = require('customize-cra');
const postRem = require('postcss-px2rem');
const autoprefixer =  require('autoprefixer');
// 代理
const devServerConfig = () => config => {
    return {
        ...config,
        proxy: {
            '/api': {
                target: "http://localhost:3001/",
                changeOrigin: true,
                secure: false,
                pathRewrite: { '/api': '' },
            }
        }
    };
};

module.exports = {
    webpack: override([
        // 新增 装饰器
        addDecoratorsLegacy(),
        // 配置less
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
                // relativeUrls: false,
                // modifyVars: { '@primary-color': '#A80000' },
                cssModules: {
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                }
            }
        }),
        // 配置postCss
        addPostcssPlugins([
            autoprefixer(),
            postRem({remUnit: 64})
        ])
    ]),
    // 配置服务
    devServer: overrideDevServer(devServerConfig())
};