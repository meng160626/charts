# 在线素材库

## 1. 环境搭建

> `vue3` + `vite` + `ts` + `scss` + `vue-router`

```DOS
npm install pinia
npm install element-plus
npm install echarts
npm install echarts-gl
npm install echarts-liquidfill
npm install @wangeditor/editor
```

## 2. 运行

```DOS
npm run dev		// 运行
npm run build	// 打包
```

## 3. 部署

> 为了部署到git page上运行页面，向`vite.config.ts`中添加以下配置，以达到从page访问时以`https://meng160626.github.io/material-library/`

```ts
defineConfig({
    base: '/material-library/',
    ...
});
```

## 4. 过程中解决的问题

### 4.1 修改`wangeditor`中所使用的`highlight.js`的高亮颜色

> 修改node_modules -> @wangeditor -> editor -> dist -> css -> style.css 中的text-shadow删除，#905改为#f08d49 .prolog颜色改为#f1ca17

```css
.w-e-text-container [data-slate-editor] pre>code {
    color: #eee;
    text-shadow: ……;// 删除
}
.w-e-text-container [data-slate-editor] pre>code .token.boolean,
.w-e-text-container [data-slate-editor] pre>code .token.constant,
.w-e-text-container [data-slate-editor] pre>code .token.deleted,
.w-e-text-container [data-slate-editor] pre>code .token.number,
.w-e-text-container [data-slate-editor] pre>code .token.property,
.w-e-text-container [data-slate-editor] pre>code .token.symbol,
.w-e-text-container [data-slate-editor] pre>code .token.tag {
    color:#f08d49;
}
.w-e-text-container [data-slate-editor] pre>code .token.cdata,
.w-e-text-container [data-slate-editor] pre>code .token.comment,
.w-e-text-container [data-slate-editor] pre>code .token.doctype,
.w-e-text-container [data-slate-editor] pre>code .token.prolog {
    color:#f1ca17;
}
```

