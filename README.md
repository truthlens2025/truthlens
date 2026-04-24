# TruthLens 真视镜

AI 内容检测工具 - 秒速识别 AI 生成内容

## 在线访问

- Netlify: https://benevolent-croquembouche-5b6913.netlify.app
- GitHub: https://github.com/truthlens2025/truthlens

## 功能

- 📝 文本检测 - 检测文章、论文是否由 AI 生成
- 🖼️ 图片识别 - 识别 AI 绘图和深度伪造
- 📄 文档分析 - 支持 PDF、Word 文档检测

## 技术栈

- 纯 HTML/CSS/JS
- 响应式设计
- 深色主题 UI
- PWA 支持
- Capacitor Android 打包

## 本地运行

```bash
npm install
npm start
```

然后打开 http://localhost:3000

## 构建安卓 APK

```bash
npx cap add android
npx cap sync
cd android && ./gradlew assembleDebug
```
