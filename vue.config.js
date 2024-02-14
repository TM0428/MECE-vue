const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.example.app",
        productName: "mece-vue",
        win: {
          target: "nsis",
          icon: "public/icon.ico"
        }
      }
    }
  }
})
