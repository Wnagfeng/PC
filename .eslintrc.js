module.exports = {
    extends: [
      'plugin:vue/recommended', // 使用推荐的 Vue 规则
    ],
    parserOptions: {
      parser: 'babel-eslint', // 使用 babel-eslint 解析器
      ecmaVersion: 2018, // 或最新的
      sourceType: 'module', // 支持 ES 模块
    },
    // 其他配置
  };
  