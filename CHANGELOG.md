# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/liaoOyao/Luckysheet/compare/v2.1.13...v2.2.0) (2024-04-03)


### Features

* 🎸 add openSearchDialog api ([2ef84ef](https://github.com/liaoOyao/Luckysheet/commit/2ef84ef7955303bd436c2e26866c4c0f7c8e22c5))
* 封装checkIsAllowEdit方法检查是否允许前台编辑 ([7b91004](https://github.com/liaoOyao/Luckysheet/commit/7b91004a31ce561f1bfd6b2b8f1f58695d8bf241))
* 复了引用打不开的bug,新增了工作表保护随sheet切换刷新的功能，新增了自定义sheet的API ,修复了使时的部分报错。 ([ead75d3](https://github.com/liaoOyao/Luckysheet/commit/ead75d3d716b70bb6c6630950129440ac39c1de8))
* 工作表表保护打开不修复；自定义sheet修复；确定工作表保护触新函数 ([a5e887c](https://github.com/liaoOyao/Luckysheet/commit/a5e887c6cf00524bccc89b743b5ce172dc25034d))
* 监听系统 Ctrl + +/-/0/wheel 的缩放，同步到表格 ([a5978c0](https://github.com/liaoOyao/Luckysheet/commit/a5978c0250b16be1a9fa4aa7c3973230ee65cfea))
* 实现 sheetCreateBefore sheetCreateAfter 钩子 ([5038508](https://github.com/liaoOyao/Luckysheet/commit/5038508842f24da14c0a8663ddfbe8c9cf7f13fe))
* 实现 sheetEditNameBefore sheetEditNameAfter 钩子 ([0f99de2](https://github.com/liaoOyao/Luckysheet/commit/0f99de220c241044b90883bdfe969142c6b0645c))
* 添加图片路径处理配置项 ([d830c15](https://github.com/liaoOyao/Luckysheet/commit/d830c151e4b245e8f8043590bfec2b38cb393c00))
* 图表坐标消息发生变动后同步至sheet ([1afc5de](https://github.com/liaoOyao/Luckysheet/commit/1afc5deae9f489863b02ea199dc8ab2c6102b760))
* 新增 sheetCopyBefore 、 sheetCopyAfter 钩子 ([0d17df9](https://github.com/liaoOyao/Luckysheet/commit/0d17df93ec98c6af11d3467085ce6ed1c6f47a43))
* 新增 sheetHideBefore sheetHideAfter 钩子 ([4412c3a](https://github.com/liaoOyao/Luckysheet/commit/4412c3aa79c446f470c7b04bd028e40adc05642e))
* 新增 sheetShowBefore sheetShowAfter 钩子 ([a849d52](https://github.com/liaoOyao/Luckysheet/commit/a849d52191aba742449915f3d446929abb55aa57))
* 新增图片单独上传，只在数据中留地址的实现 ([f1818ad](https://github.com/liaoOyao/Luckysheet/commit/f1818ada5022d1f32eedade9e186c9f670b45619))
* 新增图片删除钩子 imageDeleteBefore imageDeleteAfter ([8682011](https://github.com/liaoOyao/Luckysheet/commit/8682011c33f6459e346ae1ad17048d2b81a00a44))
* 修复数字超过16位时候的精度丢失问题，将超过16位的数字使用字符串文本返回 ([e9d2596](https://github.com/liaoOyao/Luckysheet/commit/e9d2596732b33d34258b724f2f5378020f5c009b))
* 修复指定order下标为0（第一个sheet） ([504186b](https://github.com/liaoOyao/Luckysheet/commit/504186ba66f0bfd406acafdfb2d6f86e2ce086a6))
* 修改当重命名sheet时输入了违规字符的交互方式和提示显示. ([d5fb439](https://github.com/liaoOyao/Luckysheet/commit/d5fb439c0ef6a64a325ad0c27fb2fe57df20a57e))
* 修改协同编辑的光标，hover上去显示完整用户名 ([24eef90](https://github.com/liaoOyao/Luckysheet/commit/24eef905ebc741a238f8b6765cc10b7ca9776282))
* 优化复制生成html时，colgroup的生成 ([5d62486](https://github.com/liaoOyao/Luckysheet/commit/5d62486c0632051f8fc1db7b704549ffa114a452))
* add Vue3 + Vite demo ([325934c](https://github.com/liaoOyao/Luckysheet/commit/325934c4a8b2e63d0f7eeeeef29f5a2ceb74404b))
* allow library users to add locales ([189d52f](https://github.com/liaoOyao/Luckysheet/commit/189d52f8d415f6bbf2df6081c8b967188e5533af))
* **controllers/rowcolumnoperation.j:** youjian add he delete hook hanshu,api charu ([627183f](https://github.com/liaoOyao/Luckysheet/commit/627183f571976335433798667ba26657de0d8dbc))
* paste formulas copied from Google Spreadsheet ([9722977](https://github.com/liaoOyao/Luckysheet/commit/97229770211c0bacf3685d8737a6dc3483a56cc6))
* restore change ([dbbad93](https://github.com/liaoOyao/Luckysheet/commit/dbbad9332740dfb10036ae36f128ff862f7b69ab))
* setCellValue新增2个option项目triggerBeforeUpdate和triggerUpdated ([271bff4](https://github.com/liaoOyao/Luckysheet/commit/271bff43ae67a4d5334a4a278cf76fd6ad054c09))
* setRangeConditionalFormatDefault方法支持正则表达式 ([deb0ec0](https://github.com/liaoOyao/Luckysheet/commit/deb0ec0d41449caf22d6bfad4185be1847c45b68))
* **src/controllers/constant.js src/controllers/rowcolumnoperation.js  src/index.html:** custom ([7317033](https://github.com/liaoOyao/Luckysheet/commit/7317033691b38f05a1334da757a17279dbaedb8f)), closes [#514](https://github.com/liaoOyao/Luckysheet/issues/514)


### Bug Fixes

* [#409](https://github.com/liaoOyao/Luckysheet/issues/409): `freeze range` fixes the upper left corner of the range ([a54c7a8](https://github.com/liaoOyao/Luckysheet/commit/a54c7a8a1753b74b5996a04f6af823aae22c0149))
* `cfg["rowlen"]` might be `undefined` ([0df32f8](https://github.com/liaoOyao/Luckysheet/commit/0df32f886fa0be3e303cc56d0dab659de4839273))
* 点击【transpose(switch row/column)】按钮 报错 [#6](https://github.com/liaoOyao/Luckysheet/issues/6) ([1f5c434](https://github.com/liaoOyao/Luckysheet/commit/1f5c434b107d3300a600f0d5531dca809ba60967))
* 冻结使用更贴切的文案描述 ([c28659e](https://github.com/liaoOyao/Luckysheet/commit/c28659e2516297a4bc7042ccc368dac43d82caf7))
* 对第表格一列的左侧添加列时，添加出来的列数据会同步的问题. ([035ebe5](https://github.com/liaoOyao/Luckysheet/commit/035ebe51c394089db19401f68ddb3a7b8e1b02c6))
* 防止创建重复的chart dom ([d6c7f2c](https://github.com/liaoOyao/Luckysheet/commit/d6c7f2cad977f6c5c337132ad0e54881c5e2986c))
* 加个标志位，控制冻结首行首列到底是指可是区域还是实际的 ([f265b63](https://github.com/liaoOyao/Luckysheet/commit/f265b631701b0ba6c5d505d27354e95285953f68))
* 解决容器id不是luckysheet时，点击工具栏中 “更多” 按钮，出现的偏移位置出错的问题 ([022714f](https://github.com/liaoOyao/Luckysheet/commit/022714f79a37dabc54530c9406e28049cfcb6e94))
* 解决allowEdit为false时仍然可以进行单元格合并拆分的问题 ([a52626a](https://github.com/liaoOyao/Luckysheet/commit/a52626a7c56a05406ce88ef577d51f1b4dcba2ad))
* 解决allowEdit为false时仍然允许进行边框编辑的问题。 ([bf47a7f](https://github.com/liaoOyao/Luckysheet/commit/bf47a7f6201d2c483fd26b4bcb60163d686f17a4))
* 解决allowEdit为false时允许上传图片的问题 ([76194a3](https://github.com/liaoOyao/Luckysheet/commit/76194a38c040e8fe30343377dbaead97b5ef3114))
* 取消冻结无须打勾 ([65da5b9](https://github.com/liaoOyao/Luckysheet/commit/65da5b9c653b70e0a816526b0a43b9e9c7dab10f))
* 统一命名 ([f9e383c](https://github.com/liaoOyao/Luckysheet/commit/f9e383c193aee1a9a3215e5cf52075691bd91a9f))
* 修复 showtoolbar 为 false 时的错误 ([76fabee](https://github.com/liaoOyao/Luckysheet/commit/76fabee52b7900963a69f5fee9ebc390ed767c2b))
* 修复初始config为空的清空下，粘贴后撤销，边距等信息未正确撤销的问题 ([e1e4ce3](https://github.com/liaoOyao/Luckysheet/commit/e1e4ce34ea59f2d74374458ba94ac57ff121aba9))
* 修复垂直对齐功能在跨页复制粘贴中的丢失问题 ([9db73c2](https://github.com/liaoOyao/Luckysheet/commit/9db73c2b636d445178d3cce63834d01a5aa94c47))
* 修复垂直对齐样式解析时的bug ([cfccbf7](https://github.com/liaoOyao/Luckysheet/commit/cfccbf7dfc61ce1f51aec475ae7c5f5d9e65db1b))
* 修复存在滚动时 点击冻结首列 实际冻结的是当前视图第一列的bug ([efb593b](https://github.com/liaoOyao/Luckysheet/commit/efb593b7d72ca635a8c9b1ed09fdff254a2fdf16))
* 修复存在滚动时 点击冻结首行 实际冻结的是当前视图第一行的bug ([d192b3c](https://github.com/liaoOyao/Luckysheet/commit/d192b3cf34c3021453443949cd6804bfb30e9e75))
* 修复单元格为合并单元格时仍然行高自适应的问题 ([c3a80dd](https://github.com/liaoOyao/Luckysheet/commit/c3a80dda7e936261a40e9d9a421df909a40cd1a8))
* 修复单元格有部分样式时，回车换行让样式整体覆盖的问题 ([e21fbd9](https://github.com/liaoOyao/Luckysheet/commit/e21fbd98078cec88cfdc051c4e2beb9d4aff9188))
* 修复当合并单元格只有一列宽时,在合并单元格内向右添加列会导致这个合并单元格加宽的问题 ([d3cdef4](https://github.com/liaoOyao/Luckysheet/commit/d3cdef4269a0a3d935a76d1b00ca7083201fb877))
* 修复当合并单元格只有一行高时，向下添加行会让这个合并单元格加高的问题 ([9eac6a9](https://github.com/liaoOyao/Luckysheet/commit/9eac6a9c93faaf16015fc0dcb753c9f7ed7736ce))
* 修复点击冻结首列再点击取消冻结的情况下，工具栏仍显示取消冻结的问题 ([4e4e952](https://github.com/liaoOyao/Luckysheet/commit/4e4e952f9ffc065e06f700168de204f81d7bf073))
* 修复点击冻结首行首列的滚动问题 ([009205e](https://github.com/liaoOyao/Luckysheet/commit/009205eb754babd96d22f41edc6715219d2f6e68))
* 修复调用 setSheetZoom API时图片未更新的问题 ([44a2776](https://github.com/liaoOyao/Luckysheet/commit/44a27766b3a5afb8f7c71cbf0ad714548a8d68a8))
* 修复复制生成的行高有多个colgroup而不是col的问题 ([1a179c9](https://github.com/liaoOyao/Luckysheet/commit/1a179c9695553dad7fca24b24892c4dc1c780987))
* 修复复制时的多行文本的<br>标签解析问题 ([d35b51c](https://github.com/liaoOyao/Luckysheet/commit/d35b51c320c42f23c20924ffc66c9b841f49eaa1))
* 修复复制时生成的html，行高信息不在tr上的问题 ([5c1a047](https://github.com/liaoOyao/Luckysheet/commit/5c1a0472773921114770207a6d65e2017ec3aeaa))
* 修复复制粘贴时获取的样式，下划线变成border-bottom的问题 ([e38bd4e](https://github.com/liaoOyao/Luckysheet/commit/e38bd4e6dc2b9b879524188db56052e2413487fd))
* 修复换行单元格在mergecell时内容丢失的bug ([1c6e44c](https://github.com/liaoOyao/Luckysheet/commit/1c6e44c0f0bd4706b5d16f713d2199e361df1915))
* 修复获取sheet数据时chartOptions不完整 ([7a1baa4](https://github.com/liaoOyao/Luckysheet/commit/7a1baa415471933aff70c91a2d02502f7e687506))
* 修复截图位置偏移 ([8d0b2ef](https://github.com/liaoOyao/Luckysheet/commit/8d0b2eff086a4849cd04c5277543ac4dc78709d5))
* 修复了保护工作表的提示语placeHolder为undefined的问题 ([fe724dc](https://github.com/liaoOyao/Luckysheet/commit/fe724dc53c70bad54c33a18bd3d4b8c2e65140cd))
* 修复删除 sheet 页时触发隐藏sheet钩子的问题 ([13cd4b0](https://github.com/liaoOyao/Luckysheet/commit/13cd4b004d04bddaa2b38324fea3ef1bdae5d555))
* 修复数据透视 数据声明bug ([a53e6af](https://github.com/liaoOyao/Luckysheet/commit/a53e6af0dc068d4d15d9c624d49eb5877e0e4922))
* 修复添加sheet后的数据丢失问题. ([7956748](https://github.com/liaoOyao/Luckysheet/commit/7956748e652f136a5fedfc9ef1435148434e6c5d))
* 修复添加sheet时，接受OP方的sheet滚动按钮显示问题 ([5f9ac14](https://github.com/liaoOyao/Luckysheet/commit/5f9ac1490fe57cdb0351ed6db552711eda38f0f5))
* 修复图片在裁剪等情况下的加载显示问题 ([4b57f95](https://github.com/liaoOyao/Luckysheet/commit/4b57f95208490a9749ce1316f0e281173844aa2d))
* 修复下划线功能在跨页复制粘贴时的失效问题 ([e7d6630](https://github.com/liaoOyao/Luckysheet/commit/e7d66306f6475ec11b1d62d9b1155baa92bc0aa3))
* 修复协同编辑情况下，他人正在编辑时，修改行高列宽和添加行列报错的问题 ([efe7261](https://github.com/liaoOyao/Luckysheet/commit/efe7261df6749821ec66645544031d2ad8bb2ff7))
* 修复协同编辑情况下的重命名sheet后OP广播错误问题 ([8d57d79](https://github.com/liaoOyao/Luckysheet/commit/8d57d798180e58c2cf86ed8850261d000837de10))
* 修复协同编辑下的插入超链接问题 ([b0a17b7](https://github.com/liaoOyao/Luckysheet/commit/b0a17b7f2d7b69584422e016db2d626482de3510))
* 修复隐藏和删除sheet时，右下角的滚动按钮不会重新计算的问题 ([163a344](https://github.com/liaoOyao/Luckysheet/commit/163a344ed6b784b02630aa10f650b94c35e09f49))
* 修复英文下，合并单元格的拓展菜单UI显示问题 ([64a51d3](https://github.com/liaoOyao/Luckysheet/commit/64a51d37f56164ca0087b8906cb420fc5a99bf09))
* 修复英语语种下，插入链接弹窗的链接地址栏显示错误问题 ([0629f29](https://github.com/liaoOyao/Luckysheet/commit/0629f29eb9599b12a44a9fd178249a9fcf8a5566))
* 修复右键添加多列时，添加出来的cell单元格数据会同步的问题 ([9132ef5](https://github.com/liaoOyao/Luckysheet/commit/9132ef54afba7ef0d49a020b347fd4e8e8922ba7))
* 修复在合并单元格内右键添加行列报错的问题 ([b19d877](https://github.com/liaoOyao/Luckysheet/commit/b19d87775c4c53eadf59cef3baef6294178a2dd1))
* 修复在禁止编辑下，仍然可以拖动行高列宽的问题 ([26bef65](https://github.com/liaoOyao/Luckysheet/commit/26bef655c0946bba44201e0ff0c9897c3de2ca73))
* 修复在只有一列的合并单元格内向左插入的问题 ([d8b4e7b](https://github.com/liaoOyao/Luckysheet/commit/d8b4e7b269595c57a87280596ea5d18620a6e7f4))
* 修复在只有一行的合并单元格内向上插入的问题 ([7659707](https://github.com/liaoOyao/Luckysheet/commit/7659707bc99c10431327db280a45d13ec2d4741e))
* 修复指定order下标为0（第一个sheet） ([fb2e866](https://github.com/liaoOyao/Luckysheet/commit/fb2e8668cc17ff24ae685b5e4bf8c8b8af6ed7f0))
* 修复重构工具栏配置后不传 showtoolbar showtoolbarConfig 时的bug ([4dd527b](https://github.com/liaoOyao/Luckysheet/commit/4dd527b6cf649a62e460f4664666db4d3081e293))
* 修复重命名sheet为空时的tooltip导致无法进行下一步任何操作的问题 ([68d1132](https://github.com/liaoOyao/Luckysheet/commit/68d113201c69fa54cdab1f5ddf80ac1f7938cccd))
* 修复allowEdit为false时，交替颜色可以设置的问题 ([723d6bf](https://github.com/liaoOyao/Luckysheet/commit/723d6bfacc66f937c0c260acab137cf6e13b498f))
* 修复allowEdit为false时，可以展开行列的右键菜单并且进行操作的问题 ([a4556f7](https://github.com/liaoOyao/Luckysheet/commit/a4556f7e7b3f909cf0484b8138640974b5b87abd))
* 修复allowEdit为false时，黏贴仍然可以修改表格内容的问题 ([25626de](https://github.com/liaoOyao/Luckysheet/commit/25626dedaa65ab797ec88da6fc069433d76a2adb))
* 修复allowEdit为false时还允许格式化编辑的问题 ([25f743f](https://github.com/liaoOyao/Luckysheet/commit/25f743f9702fa930be18815367f710a42eb4c1c7))
* 修复allowEdit为false时仍然允许插入超链接的问题 ([4636926](https://github.com/liaoOyao/Luckysheet/commit/4636926fd8f76d98fc0ba98fe16179f74b1e7343))
* 移除 console ([c511651](https://github.com/liaoOyao/Luckysheet/commit/c511651f94957379c1738fbf80ad51a29316506d))
* 以实际的第一行第一列冻结时，不能冻结到可视区域以外去 ([a03a442](https://github.com/liaoOyao/Luckysheet/commit/a03a442fa27ff24c41a91f1a4865316bdb268564))
* 粘贴事件会注册多次，导致多次打开后，粘贴内容的重复次数会和打开次数相同 ([2c36f26](https://github.com/liaoOyao/Luckysheet/commit/2c36f2608927d306db96686a27c39a9660767184))
* 只取第一个body元素 ([b040165](https://github.com/liaoOyao/Luckysheet/commit/b040165cd5b12462e061960fa89c4e2d93638bc3))
* apply defaultFontSize to input fields ([20b859c](https://github.com/liaoOyao/Luckysheet/commit/20b859c174a642026d99a4d89acd387d7e1e1974))
* **bug:** 初次设置 setRangeMerge error ([4428a03](https://github.com/liaoOyao/Luckysheet/commit/4428a0300cf12a545009f3a2d2a4d3217f504c03))
* **bug:** 窗口大小变化工具栏竖线问题 ([5d00990](https://github.com/liaoOyao/Luckysheet/commit/5d00990878a9c432f10657e31ac2ff40059a869e))
* **bug:** 二次create时，不能进行更改颜色 ([85e3737](https://github.com/liaoOyao/Luckysheet/commit/85e3737e3ac9bf6e4082687fb41e5b917abf3403))
* **bug:** 工具栏缩小后再放大不能回到原位置 ([37316b0](https://github.com/liaoOyao/Luckysheet/commit/37316b03e27d0fbbb2f40e2ebcdac5ce9d83642e))
* **bug:** 配置了showtoolbarConfig.undoRedo进行隐藏会出错 ([98a16d2](https://github.com/liaoOyao/Luckysheet/commit/98a16d2b18e0565f1108dbd96e6e15f7d22fa1df))
* **bug:** 配置了showtoolbarConfig报错 ([2d8d663](https://github.com/liaoOyao/Luckysheet/commit/2d8d6637951f97b9bf694f1e54e79734ca9a98e6))
* **bug:** bug ([aef64fe](https://github.com/liaoOyao/Luckysheet/commit/aef64fe160e0079e2ed15cef7987f2b87de69a8e)), closes [#475](https://github.com/liaoOyao/Luckysheet/issues/475)
* **bug:** lo undefined error ([8e93224](https://github.com/liaoOyao/Luckysheet/commit/8e9322414a08b63c1f5b65fa9deaf4419e664301))
* **bug:** pivotTable ([950f2be](https://github.com/liaoOyao/Luckysheet/commit/950f2bebda6d5d23047822923e91689bf247adca)), closes [#474](https://github.com/liaoOyao/Luckysheet/issues/474)
* **bug:** redo(重做)bug ([bb7b532](https://github.com/liaoOyao/Luckysheet/commit/bb7b532c3dd714468d36f46cc64945b8c16d900a))
* **bug:** setCellValue 初次设置时显示值不生效 ([15b810f](https://github.com/liaoOyao/Luckysheet/commit/15b810fdd686e09331837f11d6c53ab50f399fd5))
* **bug:** setcellvalue 对其方式不应被覆盖 ([08c4a22](https://github.com/liaoOyao/Luckysheet/commit/08c4a22dbeb9d16a1c4c177518d490c04318119a))
* case insensitive search becomes case sensitive ([414c29e](https://github.com/liaoOyao/Luckysheet/commit/414c29ecf2af300067b5fa4e27c1c5dc28c83d83))
* cell data contains "<" sign ([2f2e942](https://github.com/liaoOyao/Luckysheet/commit/2f2e9421f0661a0373b21dcadd66a3a4c725ca60)), closes [#1060](https://github.com/liaoOyao/Luckysheet/issues/1060)
* clearing cell removes hyperlink ([a7c7174](https://github.com/liaoOyao/Luckysheet/commit/a7c7174e67cc92893cddfd71cf9aa1b23b2ffe35))
* computeRowlenByContent function, skip hidden columns ([a27966b](https://github.com/liaoOyao/Luckysheet/commit/a27966b8a73772e44e9fda6f5438a20d43480b15))
* **constant:** 移除演示使用的邮件菜单中的 test customsButtons ([dfa6cc3](https://github.com/liaoOyao/Luckysheet/commit/dfa6cc35c77bcb394b801b0fdcc6af7298d83cb4))
* **copy&toolbar:** 点击更多；复制自定义数据 ([bdd23e5](https://github.com/liaoOyao/Luckysheet/commit/bdd23e5e8842dc1ab0ffe7e588674e2fd8ead7ee))
* copying B1 having "=A1" to A2 generates "#REF!" instead of "=2" ([94c80a9](https://github.com/liaoOyao/Luckysheet/commit/94c80a9dd9974a5f4edcd034f21818d86d24701f))
* **cursorPos:** 修复 event.target 为 document 等情况下代码报错的问题 ([45f0aea](https://github.com/liaoOyao/Luckysheet/commit/45f0aea5484d7e8aaf5aac15f02fa14a89506fd8))
* **dataVerificationCtrl.js:** 优化身份证验证规则 ([adf2fb3](https://github.com/liaoOyao/Luckysheet/commit/adf2fb3eb6f01020ac4bd5280f3e17b69a8e6f5e))
* **dataVerificationCtrl:** 修复文本长度验证切换选项时 下面输入框不切换的问题 ([2191f73](https://github.com/liaoOyao/Luckysheet/commit/2191f733e33dc3612dd613c6ecdaef6e97f0c768))
* **dataVerificationCtrl:** 验证时文本长度应为大于等于0的整数 ([c581ecd](https://github.com/liaoOyao/Luckysheet/commit/c581ecd0f0aac00005c2442c441257e0b4674f21))
* **demo:** demo index ([767bff2](https://github.com/liaoOyao/Luckysheet/commit/767bff26828cc0255b350b109f86d6d717470ebc))
* **demo:** token alert ([cc4f8bb](https://github.com/liaoOyao/Luckysheet/commit/cc4f8bb8f798db17bbd4cca3d3511c3380870c2d))
* **draw.js:** 数字格式的单元格值为字符串时设置条件格式为数据条会报错 ([8aa9795](https://github.com/liaoOyao/Luckysheet/commit/8aa9795f7ac990a41329c8c009ac4af6fccc6040)), closes [#528](https://github.com/liaoOyao/Luckysheet/issues/528)
* **draw.js:** 修复背景色会盖过边框的问题 ([2509ad9](https://github.com/liaoOyao/Luckysheet/commit/2509ad96cd4391dc31de56b93bbfa5f25cc6f6c9))
* **drop cell:** drop cell formula ([69884f6](https://github.com/liaoOyao/Luckysheet/commit/69884f6febf10ee32b007ab5d46ee7ec25845ea8))
* dropCell.update function ([a415a2e](https://github.com/liaoOyao/Luckysheet/commit/a415a2e6524522ee155e06ce6042796f683f4d2c))
* **event:** click event scroll ([776757d](https://github.com/liaoOyao/Luckysheet/commit/776757d7333519a28e8bead741623a53854bea3d))
* **export:** remove export config ([90f9ee1](https://github.com/liaoOyao/Luckysheet/commit/90f9ee1e93ad854e7a21f1e132da5e3ed7847bc6))
* Find&Replace also replaces in locked cells ([3b37761](https://github.com/liaoOyao/Luckysheet/commit/3b377617b3aee791630f93dee642caa07fb9f968))
* **formula:** ask ai function ([0abd26a](https://github.com/liaoOyao/Luckysheet/commit/0abd26a9db889e226d2081628cdb701d7c465df9))
* **formula:** ask ai function ([1203da9](https://github.com/liaoOyao/Luckysheet/commit/1203da9d5770dcff558517382dd127bc5def5298))
* **formula:** get airtable error ([bd35f52](https://github.com/liaoOyao/Luckysheet/commit/bd35f52b3c70d642c56ebb27dcac69495cd60b55))
* **formula:** INDIRECT update ([4b9b174](https://github.com/liaoOyao/Luckysheet/commit/4b9b174e17fc235e1af293cc320a0ad6548b9836))
* **formula:** refresh button hide ([192a34c](https://github.com/liaoOyao/Luckysheet/commit/192a34cf1cc5f27cfae501200d917390c911de0b))
* **formula:** remote ([660ca43](https://github.com/liaoOyao/Luckysheet/commit/660ca43c6df40a74639115e1dd1273f03911d52b))
* **formula:** remote refresh ([86de7ef](https://github.com/liaoOyao/Luckysheet/commit/86de7ef33f5c303f0fdc0835c9531fa32e0f1835))
* **formula:** result data ([23c34d5](https://github.com/liaoOyao/Luckysheet/commit/23c34d52b316eac59227434db26fa3ec76066910))
* **formula:** Supports cross-table references ([5a69a4e](https://github.com/liaoOyao/Luckysheet/commit/5a69a4eb2781bcc98603f37aa6e65326949fa55b))
* **freezen:** 修复PR[#843](https://github.com/liaoOyao/Luckysheet/issues/843)中修改遗漏处理冻结到选区的问题 ([3421f67](https://github.com/liaoOyao/Luckysheet/commit/3421f678db6c3a69d712270c0f3bc960c1a65171))
* function DATEDIF ([f02bdff](https://github.com/liaoOyao/Luckysheet/commit/f02bdffc4c9c14695b5d34b79cebcae72f688939))
* function DATEDIF. Unit="YD" returns NaN ([880544e](https://github.com/liaoOyao/Luckysheet/commit/880544edc233f740f90d723d0c298c562e9ffb9b))
* **function:** get target area extend ([6e45a67](https://github.com/liaoOyao/Luckysheet/commit/6e45a67f22f07d2f35dc2db6e3863bb940fc2a53))
* **functionimplementation.js:** 补充 luckysheet_calcADPMM 函数引用 ([bfc2aa9](https://github.com/liaoOyao/Luckysheet/commit/bfc2aa99d28745d93f332f3ec7bf16416533ccd0))
* **getDefaultColWidth:** 修复当工作表没有配置默认列宽时返回undefined的问题 ([d24f9f9](https://github.com/liaoOyao/Luckysheet/commit/d24f9f9ce7911db0b8d74b515aed205af573e110))
* **getDefaultRowHeight:** 修复当工作表没有配置默认行高时返回undefined的问题 [#861](https://github.com/liaoOyao/Luckysheet/issues/861) ([cff7e86](https://github.com/liaoOyao/Luckysheet/commit/cff7e865e41a0b1a54c9bac2aea46ad286a61fbc))
* **gulpfile:** 完善打包配置 ([c5b0fca](https://github.com/liaoOyao/Luckysheet/commit/c5b0fcad47b972ca9dafb2fea363c36b594f6b2d))
* handle touch events on iPad ([9f601cb](https://github.com/liaoOyao/Luckysheet/commit/9f601cb87b6febbd89c05b789538dc486f80ffca))
* **hyperlinkctrl.js:** 修复插入链接，撤销后，点击其他单元格报错的bug ([e765070](https://github.com/liaoOyao/Luckysheet/commit/e765070525914b9eec34a5b882ad7eb8ac90167f))
* **hyperlinkCtrl:** 修复插入链接后，再次编辑链接，链接文本为还原显示的bug ([aa0b4eb](https://github.com/liaoOyao/Luckysheet/commit/aa0b4ebc4c7451e5c50897b47090fe6696910c8e))
* **image:** fix [#81](https://github.com/liaoOyao/Luckysheet/issues/81) delete rich text cell, ([8298069](https://github.com/liaoOyao/Luckysheet/commit/8298069c5ede914d6321eabe550cc9cd48aa4770)), closes [#174](https://github.com/liaoOyao/Luckysheet/issues/174)
* increase/decrease decimal places was reversed ([a99de8c](https://github.com/liaoOyao/Luckysheet/commit/a99de8c31f8a44095a22aef6151ebb429d343ae2))
* localize hardcoded texts ([4aa9a50](https://github.com/liaoOyao/Luckysheet/commit/4aa9a50a4a046bfcf7ced6e0369d0e6e3a338202))
* localize hardcoded texts ([f49de0f](https://github.com/liaoOyao/Luckysheet/commit/f49de0fc3b3064a4a23a5c8f4689fd0894d222a3))
* **menuButton.js:** 修复选中部分合并单元格时，格式刷渲染错误的问题 ([e979f93](https://github.com/liaoOyao/Luckysheet/commit/e979f930804db1e3b04f5fe0e1714571b7802366))
* **options:** 修复showtoolbarConfig配置font:false时的报错 ([9857a5a](https://github.com/liaoOyao/Luckysheet/commit/9857a5a8159dd9646fbce0536bbf7eec60468fe8))
* **pivotTable:** calc ([69d78fa](https://github.com/liaoOyao/Luckysheet/commit/69d78faab2786dccffaaedb0e360fcc56802591c))
* **postil:**  修复批注鼠标悬浮显示时，大小和编辑状态不一致的问题 ([af4d166](https://github.com/liaoOyao/Luckysheet/commit/af4d16690ddfaa8053777f02d83f5cc5e7bfe330))
* **postil:** 修复 commentUpdateBefore 钩子中的bug ([a0c93c0](https://github.com/liaoOyao/Luckysheet/commit/a0c93c0b6f9f31741f1028d215c355fc7ff9a2c3))
* **postil:** 修复插入行列的时候批注被复制的问题 ([4a5d2ab](https://github.com/liaoOyao/Luckysheet/commit/4a5d2abfc91e7613f86fdb4edb153ed7290c8a96))
* **rowColumnOperation:** 修复单元格清除内容后，超链接依然存在的bug ([48192ad](https://github.com/liaoOyao/Luckysheet/commit/48192adbd294f0e7dd18f7960ad3f32c91c2cff8))
* **search:** 查找搜索的错误，未勾选正则时，也是正则搜索 ([6970f47](https://github.com/liaoOyao/Luckysheet/commit/6970f47f8475d754069040c76219eea69a7f4a70))
* **selection:** rich text copy paste error ([c8dd424](https://github.com/liaoOyao/Luckysheet/commit/c8dd4240166be026b5c4b78538509fdb1a97ee34))
* **server.js:** 修复协同编辑器i情况下，如果光标在左上的边接处显示不全的问题 ([be1b655](https://github.com/liaoOyao/Luckysheet/commit/be1b65515fab0e9f376d64ef82d7e8cee2e4a8ba))
* **sheetmanage:** 修复切换sheet滚动按钮大部分情况始终显示的bug ([74b1f5d](https://github.com/liaoOyao/Luckysheet/commit/74b1f5d277028c23b083a55182a122219a7dfec1))
* **sheetmanage:** jQuery3.0获取宽度有小数的问题 ([b7810c7](https://github.com/liaoOyao/Luckysheet/commit/b7810c74135e3c074611ff53b75fbe89f538bf56))
* **src/controllers/filter.js:** 合并单元格筛选异常 ([efffd54](https://github.com/liaoOyao/Luckysheet/commit/efffd54cd7a2f6cea3396ea8f5e4b6b4a8ae0fcc)), closes [#1309](https://github.com/liaoOyao/Luckysheet/issues/1309)
* **src/controllers/inlinestring.js updateinlinestringformat:** 内联样式设置的时候，会对部分内容失效 ([962cf89](https://github.com/liaoOyao/Luckysheet/commit/962cf895dd5fa2d1ab2510340f8d1356077e05ee))
* **toolbar:** toolbar ([86a3280](https://github.com/liaoOyao/Luckysheet/commit/86a328000080107b3914b218b74e9513fa9f53aa)), closes [#414](https://github.com/liaoOyao/Luckysheet/issues/414)
* typo ([2eb9389](https://github.com/liaoOyao/Luckysheet/commit/2eb9389d15d672ebc89a3ccfe9a3cd49d33b925e))
* typo ([9cd9ba0](https://github.com/liaoOyao/Luckysheet/commit/9cd9ba0149286fb29db09528995e6d1e92db303b))
* undo rodo 不可用时图标灰化 ([ca02b31](https://github.com/liaoOyao/Luckysheet/commit/ca02b31427d39ef622d613a83d3a2b20e01c3c97))
* update calcChain and hyperlink on merge cells ([b7f7af5](https://github.com/liaoOyao/Luckysheet/commit/b7f7af5d293408340ed2ce39bcd6f5788c4266b0))
* **updatecell.js:** 修复双击和Enter键激活单元格，输入中文时的首字母变成拼音的bug ([02f3eb9](https://github.com/liaoOyao/Luckysheet/commit/02f3eb9aea9d887f86dea303d22be6cf015ae884)), closes [#726](https://github.com/liaoOyao/Luckysheet/issues/726)
* warning: duplicate key in object literal ([b38fa85](https://github.com/liaoOyao/Luckysheet/commit/b38fa855ef563c552da8bfaa611f961bc2605a47))

### [2.1.13](https://github.com/mengshukeji/Luckysheet/compare/v2.1.12...v2.1.13) (2021-01-19)


### Bug Fixes

* **bug:** bug ([025823b](https://github.com/mengshukeji/Luckysheet/commit/025823b9f386c8048aa44b62f076a739eaa980c0)), closes [#435](https://github.com/mengshukeji/Luckysheet/issues/435)
* **bug:** bug ([a8ff967](https://github.com/mengshukeji/Luckysheet/commit/a8ff967be9cdcf3bbcb0045888951a26a852500a)), closes [#398](https://github.com/mengshukeji/Luckysheet/issues/398)
* **bug:** bug ([deb3a96](https://github.com/mengshukeji/Luckysheet/commit/deb3a965b881d747f9a2171f7d9c9f967d671901))
* **bug:** bug ([5ce1f4a](https://github.com/mengshukeji/Luckysheet/commit/5ce1f4a0b753b7a95569b5285d749389e4d8b943)), closes [#433](https://github.com/mengshukeji/Luckysheet/issues/433)
* **bug:** bug ([932e821](https://github.com/mengshukeji/Luckysheet/commit/932e8215563248f97547ad21a429ef3f8ed0682b)), closes [#423](https://github.com/mengshukeji/Luckysheet/issues/423) [#424](https://github.com/mengshukeji/Luckysheet/issues/424)
* **bug:** bug ([06636f6](https://github.com/mengshukeji/Luckysheet/commit/06636f6a3c08128fe50aa880baabc9420fce4092)), closes [#154](https://github.com/mengshukeji/Luckysheet/issues/154) [#410](https://github.com/mengshukeji/Luckysheet/issues/410) [#416](https://github.com/mengshukeji/Luckysheet/issues/416)
* **bug:** history bug ([973eec8](https://github.com/mengshukeji/Luckysheet/commit/973eec8b71ea963bb23c9fe35c985e86c85ef019))
* **bug:** setRangeFormat history ([065148b](https://github.com/mengshukeji/Luckysheet/commit/065148b5a97e9090479f401463c548c3346757ec))
* **bug:** setRangeShow api ([5bbc45b](https://github.com/mengshukeji/Luckysheet/commit/5bbc45b68e807a2c58c328d93fe8079f3e56fa9f))
* bug ([7412c5b](https://github.com/mengshukeji/Luckysheet/commit/7412c5b4f5aa0afd93f3e0210d3f3fe182c67273))
* **bug:** 文本自动换行bug ([bc926e5](https://github.com/mengshukeji/Luckysheet/commit/bc926e5c49f008c14b4b5e1fdf13713fd6e995b5))
* 换行 ([94022a4](https://github.com/mengshukeji/Luckysheet/commit/94022a48b6407523c5924e94c86fb2ada0fab301))
* **bug:** 渲染换行空行 ([4162b7a](https://github.com/mengshukeji/Luckysheet/commit/4162b7a049f109715a9246ce610d05882d5a5f12))
* **hook:** cellrender ([d444980](https://github.com/mengshukeji/Luckysheet/commit/d44498086fcd3b1b2bf75e95c6a236bc79a1df13))
* **let:** let declar ([71ade32](https://github.com/mengshukeji/Luckysheet/commit/71ade32abd3989230db609ec37f92e931a4473f0))
* **pivottable:** fix ([7cecb12](https://github.com/mengshukeji/Luckysheet/commit/7cecb12ae3a1a0bd0d5bdce803429d4464388e31)), closes [#439](https://github.com/mengshukeji/Luckysheet/issues/439) [#447](https://github.com/mengshukeji/Luckysheet/issues/447)
* **pivottable:** init ([5b19e8b](https://github.com/mengshukeji/Luckysheet/commit/5b19e8b06bdd95c2b799d2cc1d6ae677b96617cd))
* **pivottable:** refresh ([78330c9](https://github.com/mengshukeji/Luckysheet/commit/78330c95db2735c8139b0320c2e81ee6f438adea))

### [2.1.12](https://github.com/mengshukeji/Luckysheet/compare/v2.1.11...v2.1.12) (2020-12-22)


### Features

* **api:** find ([ea97233](https://github.com/mengshukeji/Luckysheet/commit/ea97233a668b3a682f6f0b1ad3fec251b01c33ab))


### Bug Fixes

* **bug:** bug ([9357792](https://github.com/mengshukeji/Luckysheet/commit/9357792fd1c49737398cf86cdf87d9dbfe35df26)), closes [#359](https://github.com/mengshukeji/Luckysheet/issues/359) [#360](https://github.com/mengshukeji/Luckysheet/issues/360) [#376](https://github.com/mengshukeji/Luckysheet/issues/376) [#382](https://github.com/mengshukeji/Luckysheet/issues/382)
* **bug:** bug ([19560eb](https://github.com/mengshukeji/Luckysheet/commit/19560eba3fe36cce4ee65ba3e8ac80ab7ec8d620)), closes [#367](https://github.com/mengshukeji/Luckysheet/issues/367) [#370](https://github.com/mengshukeji/Luckysheet/issues/370)
* **bug:** bug ([0f257e8](https://github.com/mengshukeji/Luckysheet/commit/0f257e8f153bb6c0cf38fb85200c587aabac164c)), closes [#361](https://github.com/mengshukeji/Luckysheet/issues/361) [#364](https://github.com/mengshukeji/Luckysheet/issues/364) [#365](https://github.com/mengshukeji/Luckysheet/issues/365)
* **bug:** copy bug ([2bcbab9](https://github.com/mengshukeji/Luckysheet/commit/2bcbab9a9f4727fd03930962a2dbdcaec3401597))
* **feature:** functionButton ([5983cb0](https://github.com/mengshukeji/Luckysheet/commit/5983cb015e092e2edc1d3f27dba2d585fb4db099)), closes [#336](https://github.com/mengshukeji/Luckysheet/issues/336) [#381](https://github.com/mengshukeji/Luckysheet/issues/381)
* copy ([d177cc8](https://github.com/mengshukeji/Luckysheet/commit/d177cc8f5ee01d32932d1137920883209ec24be4))

### [2.1.10](https://github.com/mengshukeji/Luckysheet/compare/v2.1.9...v2.1.10) (2020-12-18)


### Bug Fixes

* **rowtitle:** bug ([8faeffe](https://github.com/mengshukeji/Luckysheet/commit/8faeffee08840a5e8119d9fc8ac7204248105616))

### [2.1.9](https://github.com/mengshukeji/Luckysheet/compare/v2.1.8...v2.1.9) (2020-12-17)


### Bug Fixes

* **bug:** bug ([54ae143](https://github.com/mengshukeji/Luckysheet/commit/54ae143aa268b5ce0253752a2a92b2ab22601b42)), closes [#222](https://github.com/mengshukeji/Luckysheet/issues/222) [#355](https://github.com/mengshukeji/Luckysheet/issues/355)
* **numeral:** userInfo ([871d381](https://github.com/mengshukeji/Luckysheet/commit/871d3819f7c734b604f19da1ba81bf5ee0ea0814)), closes [#338](https://github.com/mengshukeji/Luckysheet/issues/338)

### [2.1.8](https://github.com/mengshukeji/Luckysheet/compare/v2.1.7...v2.1.8) (2020-12-16)


### ⚠ BREAKING CHANGES

* **bug:** n

### Features

* **api add:** image ([16131b2](https://github.com/mengshukeji/Luckysheet/commit/16131b2776cd278bb7bddae674c206aa739f3a46)), closes [#270](https://github.com/mengshukeji/Luckysheet/issues/270)
* **changlang:** changLang ([cbc81e9](https://github.com/mengshukeji/Luckysheet/commit/cbc81e9e17ca56e09f9e697e5372650f3d6a476b)), closes [#318](https://github.com/mengshukeji/Luckysheet/issues/318)
* **collaborative editing:** collaborative editing ([6fe8726](https://github.com/mengshukeji/Luckysheet/commit/6fe87260e8986cd83e7bcf655594389c01739107)), closes [#199](https://github.com/mengshukeji/Luckysheet/issues/199) [#201](https://github.com/mengshukeji/Luckysheet/issues/201) [#202](https://github.com/mengshukeji/Luckysheet/issues/202)
* **condition format:** formula condition ([6c98bde](https://github.com/mengshukeji/Luckysheet/commit/6c98bded8dcf16aab4bcc89a63a62d3878c06cd3)), closes [#186](https://github.com/mengshukeji/Luckysheet/issues/186)
* **demo:** proxy ([bc64807](https://github.com/mengshukeji/Luckysheet/commit/bc64807de9e3f8f60ddc529c6b795c95aff1884c))
* **feature:** closeWebsocket api and ctrl ; ([9153bc7](https://github.com/mengshukeji/Luckysheet/commit/9153bc799db2aea947f2ba70a7b947daca55b844)), closes [#328](https://github.com/mengshukeji/Luckysheet/issues/328) [#326](https://github.com/mengshukeji/Luckysheet/issues/326)
* **hook:** add ([2c6b1c2](https://github.com/mengshukeji/Luckysheet/commit/2c6b1c21b3ad6535671745fd7483d9318f7e55ec))
* **print feature:** develop ([a0921b6](https://github.com/mengshukeji/Luckysheet/commit/a0921b62d73b8b3edcaf1c72dd9e35cd43848f2f))


### Bug Fixes

* **add forcecaculation config:** add ([e96d210](https://github.com/mengshukeji/Luckysheet/commit/e96d210fe544caa8b912720a274374bccb0cef7d))
* **bug:** bug ([95e26c3](https://github.com/mengshukeji/Luckysheet/commit/95e26c3fa07fa74c238c0c7b96b5b7ff91b79889)), closes [#330](https://github.com/mengshukeji/Luckysheet/issues/330)
* **bug:** bug ([c003f8a](https://github.com/mengshukeji/Luckysheet/commit/c003f8a4281f346c89226061851f71693208574a)), closes [#184](https://github.com/mengshukeji/Luckysheet/issues/184) [#337](https://github.com/mengshukeji/Luckysheet/issues/337)
* **bug:** bug ([4900b4a](https://github.com/mengshukeji/Luckysheet/commit/4900b4a0f2a82528e130d7281bb1f153ed3297fe)), closes [#331](https://github.com/mengshukeji/Luckysheet/issues/331)
* **bug:** bug ([b93ea6b](https://github.com/mengshukeji/Luckysheet/commit/b93ea6b66e444d387f230602dd02034b4b237369)), closes [#284](https://github.com/mengshukeji/Luckysheet/issues/284) [#296](https://github.com/mengshukeji/Luckysheet/issues/296)
* **bug:** bug ([57ff2b9](https://github.com/mengshukeji/Luckysheet/commit/57ff2b959b4be8d5cad559624d92f00e996d315f)), closes [#182](https://github.com/mengshukeji/Luckysheet/issues/182) [#220](https://github.com/mengshukeji/Luckysheet/issues/220)
* **bug:** bug ([31bdc4f](https://github.com/mengshukeji/Luckysheet/commit/31bdc4feae0037c92074b244e9e52363298b164d)), closes [#263](https://github.com/mengshukeji/Luckysheet/issues/263)
* **bug:** bug ([385bc03](https://github.com/mengshukeji/Luckysheet/commit/385bc039c91727655ea771c7a48d6f0890a275fb)), closes [#243](https://github.com/mengshukeji/Luckysheet/issues/243) [#226](https://github.com/mengshukeji/Luckysheet/issues/226)
* **bug:** bug ([88aa6c5](https://github.com/mengshukeji/Luckysheet/commit/88aa6c5b59964078c6a9cfffb41308c196a44953)), closes [#278](https://github.com/mengshukeji/Luckysheet/issues/278) [#276](https://github.com/mengshukeji/Luckysheet/issues/276) [#267](https://github.com/mengshukeji/Luckysheet/issues/267) [#215](https://github.com/mengshukeji/Luckysheet/issues/215)
* **bug:** copy to excel ([5cf72ec](https://github.com/mengshukeji/Luckysheet/commit/5cf72ec0781f0e3b2ddc77eac228812507ce66a2)), closes [#319](https://github.com/mengshukeji/Luckysheet/issues/319)
* **bug:** data verification range select ([6d60679](https://github.com/mengshukeji/Luckysheet/commit/6d606791abaa5d410ce68cfb49f8bc9c2dfaf609))
* **cell:** render ([ba21140](https://github.com/mengshukeji/Luckysheet/commit/ba2114055ba62b0401c76075054588642fa4fbf1))
* **demo:** websocket url ([cf77ec3](https://github.com/mengshukeji/Luckysheet/commit/cf77ec3307c0d44bc5303f606762c003d4f50b86))
* **dynamic array refresh fix:** fix ([b7d634f](https://github.com/mengshukeji/Luckysheet/commit/b7d634f0425dd8cb337784b10094d0952edc460a))
* **fix #209:** highlight ([ab2d8b7](https://github.com/mengshukeji/Luckysheet/commit/ab2d8b7b5467200e12c8d4c1ece014ebfc6ee7cc)), closes [#209](https://github.com/mengshukeji/Luckysheet/issues/209)
* **fix #209 ,fix #219:** highlight follow checkout keep highlight ([c547596](https://github.com/mengshukeji/Luckysheet/commit/c5475964e41eb7bb12d87b679dffba4b988abb30)), closes [#209](https://github.com/mengshukeji/Luckysheet/issues/209) [#219](https://github.com/mengshukeji/Luckysheet/issues/219)
* **fix #209 fix #219:** highlight follow checkout page ([0a5ca86](https://github.com/mengshukeji/Luckysheet/commit/0a5ca86ab808d2cb1da8cb14d93c5d787c50f540)), closes [#209](https://github.com/mengshukeji/Luckysheet/issues/209) [#219](https://github.com/mengshukeji/Luckysheet/issues/219)
* **fix #209 fix #219:** highlight follow, checkout keep highlight ([2c7b0bb](https://github.com/mengshukeji/Luckysheet/commit/2c7b0bbdf5adf1b2a6fc537e37825ab01ee3cf96)), closes [#209](https://github.com/mengshukeji/Luckysheet/issues/209) [#219](https://github.com/mengshukeji/Luckysheet/issues/219)
* **fix #290:** userinfo ([80d67e1](https://github.com/mengshukeji/Luckysheet/commit/80d67e157d010f8e59c472b2e6046c04efe9b966)), closes [#290](https://github.com/mengshukeji/Luckysheet/issues/290)
* **fix #290:** userinfo ([dddfc8f](https://github.com/mengshukeji/Luckysheet/commit/dddfc8f9418991466025682309e73950da6611cd)), closes [#290](https://github.com/mengshukeji/Luckysheet/issues/290)
* **fix #290:** userinfo ([27a770e](https://github.com/mengshukeji/Luckysheet/commit/27a770ee863356d2ef120970723bb048c510d9aa)), closes [#290](https://github.com/mengshukeji/Luckysheet/issues/290)
* **main canvas:** bottom space ([23c8a78](https://github.com/mengshukeji/Luckysheet/commit/23c8a78cb3bd387c7c609250de41b187105475b5))
* **tojson:** bug ([1c94783](https://github.com/mengshukeji/Luckysheet/commit/1c94783677bcfe6488caf39028f18e5b2505a737))
*  setCellValue API 可设置自定义的属性，不显式设置v, v 不会丢失 ([6d45cf2](https://github.com/mengshukeji/Luckysheet/commit/6d45cf2ce63dca282f4a40ce5aaf628f94bfc8d1))
* jfrefreshgrid 函数第二个参数应该是个数组 ([c7cf87a](https://github.com/mengshukeji/Luckysheet/commit/c7cf87a49b1b8ce64fb21249cd05950fabc0e546))
* setCellFormat data  引用 ([ed50e47](https://github.com/mengshukeji/Luckysheet/commit/ed50e47b44e079bc76419ba3f96f04d964c70610))
* setCellValue 刷新页面时的历史记录问题 ([a2cf969](https://github.com/mengshukeji/Luckysheet/commit/a2cf96978f97b289d603aa404bcfaf8a0d64f87b))
* 修复alert ([94e0020](https://github.com/mengshukeji/Luckysheet/commit/94e0020acd49aed50810e6c133688c950690ab3c))
* 修复主动关闭socket仍然alert弹窗 ([e0bdb2c](https://github.com/mengshukeji/Luckysheet/commit/e0bdb2c4015355e428c5e8d567196d607606a38e))
* 修复主动关闭socket定时器仍运行问题 ([82a8731](https://github.com/mengshukeji/Luckysheet/commit/82a87319342c698c1a1a58972a9d59ab3b7e91cd))
* 初始化表单状态下标调整 ([3a54312](https://github.com/mengshukeji/Luckysheet/commit/3a54312c93a6daebf575639dd612e0d01be2a296))
* 复制选区虚线框正确显示 ([9d6a2ee](https://github.com/mengshukeji/Luckysheet/commit/9d6a2eed05ae660fb65515217e156817fc4d6443))
* 解决单击非时间日期单元格后还会跳出日期时间弹框 ([fc9eb4e](https://github.com/mengshukeji/Luckysheet/commit/fc9eb4e7984af6991b79acae6a2a5c0bbea5254f))
* **fix forcecaculation feature:** complete ([7568ceb](https://github.com/mengshukeji/Luckysheet/commit/7568ceb442acdfdedeb6d6e4d623bdcd2a8c4018))
* **formula contain text bug:** add iscell method ([89358d3](https://github.com/mengshukeji/Luckysheet/commit/89358d36045baca791f2b5e9d2152349bf5903cf))
* **formula update fix:** formula update only one level, when cell value change. Fix it ([cf6c5be](https://github.com/mengshukeji/Luckysheet/commit/cf6c5be8a45616e1002db0ff4b04b47c3ed4c38e))

### [2.1.7](https://github.com/mengshukeji/Luckysheet/compare/v2.1.6...v2.1.7) (2020-11-26)


### Features

* **demo:** tool function ([3baf93c](https://github.com/mengshukeji/Luckysheet/commit/3baf93cdb57238ee73ace3e7b9bca142fad81584))
* 修改日期能够正常的弹出格式框和设置对应格式的日期时间 ([2c27044](https://github.com/mengshukeji/Luckysheet/commit/2c2704473c1c5a77091acda45a46f39ebbad3592))
* 修改日期能够正常的弹出格式框和设置对应格式的日期时间 ([67c44e7](https://github.com/mengshukeji/Luckysheet/commit/67c44e7a68d948fcb90bd499ecc15cfb2bea5127))


### Bug Fixes

* **formula:** function ([dad6e2b](https://github.com/mengshukeji/Luckysheet/commit/dad6e2b2d144a31f4cfaaf84c90588e1a02ee006))
* **formular:** docs ([ddac582](https://github.com/mengshukeji/Luckysheet/commit/ddac582f696898a1a46fc0ce3eb5d245d20077ae))
* **hook:** function ([fb43a56](https://github.com/mengshukeji/Luckysheet/commit/fb43a56222c3d4c77b84efa9ff37eed8e1333a1a))
* **hook function:** cellupdate ([5e8f71f](https://github.com/mengshukeji/Luckysheet/commit/5e8f71f32e5104769dbe6e0c61de3cd26b286344))
* ie11右下角菜单图标会出现错位 ([34fd6e7](https://github.com/mengshukeji/Luckysheet/commit/34fd6e74cb87f9563ff28979d9f5f8a192fb558a))
* 重复create会出现很多问题 ([8f22790](https://github.com/mengshukeji/Luckysheet/commit/8f227904fe9600ea17fdc346924d73c3bc81a041))

### [2.1.6](https://github.com/mengshukeji/Luckysheet/compare/v2.1.5...v2.1.6) (2020-11-23)


### ⚠ BREAKING CHANGES

* yes

q

### Features

* **api:** hook function ([a0db530](https://github.com/mengshukeji/Luckysheet/commit/a0db530295bca24b81b02171a073f6b6f1227ce6))
* **hook:** add hook function ([215dec2](https://github.com/mengshukeji/Luckysheet/commit/215dec27d796ee9b5be7857a425093a53db84332))
* q ([54a42a2](https://github.com/mengshukeji/Luckysheet/commit/54a42a274a96eb3334602fd0de65e1d4b2fc492a))
* **bottom alignment of english letters:** fix ([a596d2f](https://github.com/mengshukeji/Luckysheet/commit/a596d2fcd617cac196e3336a8dfe8ac9ba58c9f7))
* **config:** sheetRightClickConfig ([59c7cb3](https://github.com/mengshukeji/Luckysheet/commit/59c7cb34a33450e59023fd1ae5e615f3e40ef0d9))
* add underline button ([df56ba6](https://github.com/mengshukeji/Luckysheet/commit/df56ba6f359bb12eb765b26b973100c554601eca))
* use npm dependencies ([e4bd439](https://github.com/mengshukeji/Luckysheet/commit/e4bd439a0e96dbec0cb3a45e01aaecb129fab2ad))
* **row and column width:** batch change the height and width of the selected row and column ([956bd2a](https://github.com/mengshukeji/Luckysheet/commit/956bd2a01012b429c58a14b5b88d02a02350b662))


### Bug Fixes

* **bug fix:** [#26](https://github.com/mengshukeji/Luckysheet/issues/26) [#91](https://github.com/mengshukeji/Luckysheet/issues/91) ([a26ffd8](https://github.com/mengshukeji/Luckysheet/commit/a26ffd8ac388db475dfd38e4ae83098eeeee8bc8))
* **cooperative:** bug ([9e48c72](https://github.com/mengshukeji/Luckysheet/commit/9e48c72a47022188d387558b5b5f3a6250878c65))
* **demo:** ie11 ([e7ddc39](https://github.com/mengshukeji/Luckysheet/commit/e7ddc397c8b1e421c63f3e9f661ced99a3d81556)), closes [#234](https://github.com/mengshukeji/Luckysheet/issues/234)
* **fix #212:** cancel highlight ([289d3ef](https://github.com/mengshukeji/Luckysheet/commit/289d3ef46ebadf9662d272109a1f24d2a8b0dc1d)), closes [#212](https://github.com/mengshukeji/Luckysheet/issues/212)
* **fix #219:** checkout ([15dca04](https://github.com/mengshukeji/Luckysheet/commit/15dca040840d228f6326d4eecad917df38e15f04)), closes [#219](https://github.com/mengshukeji/Luckysheet/issues/219)
* **fix #219:** clear info ([080f027](https://github.com/mengshukeji/Luckysheet/commit/080f0275b80143026cc30e8450c901715fc51c19)), closes [#219](https://github.com/mengshukeji/Luckysheet/issues/219)
* sheet menu position ([a40f679](https://github.com/mengshukeji/Luckysheet/commit/a40f679fde6700c90cd66c66bb070afabb31fb83))
* **iconfont:** conflict ([bf4d539](https://github.com/mengshukeji/Luckysheet/commit/bf4d539dddc4cef232f8eae602b39980ded5b208))
* **mousemove hook error:** fix ([89b93e7](https://github.com/mengshukeji/Luckysheet/commit/89b93e71460750be8f736df0dbc13675daf5d72d))

### [2.1.5](https://github.com/mengshukeji/Luckysheet/compare/v2.1.4...v2.1.5) (2020-11-03)


### Features

* **cell date picker:** cell date picker and bug solve ([2996ae9](https://github.com/mengshukeji/Luckysheet/commit/2996ae9cab724714903d00e0b63022abc4a1a3b6))
* **cell hooks add:** go to document for detail ([927ff46](https://github.com/mengshukeji/Luckysheet/commit/927ff46949f688a5bcffcb3fe48dc6b4b12b61c9))
* **config:** custom menu button config ([14eb78e](https://github.com/mengshukeji/Luckysheet/commit/14eb78e153cbce726adf9e093702f9b93af1fa03))
* **config:** sheetbar ([3555746](https://github.com/mengshukeji/Luckysheet/commit/3555746f4cc8ef2c1fe163a34edd428f1a6377ed))
* **date format:** date format Chinese ([8f8d0cb](https://github.com/mengshukeji/Luckysheet/commit/8f8d0cb8c5563a31afba3fe11b525e6bccd5eb56))
* **hyperlink:** add hyperlink function ([439dff4](https://github.com/mengshukeji/Luckysheet/commit/439dff4330ab5053643331286091d44ae910fb8d))
* **hyperlink:** perfect hyperlink function ([5adfc60](https://github.com/mengshukeji/Luckysheet/commit/5adfc6055bf4cfed7f1ff40933d292057196bc7e))
* **statisticbar:** config docs ([c1ed417](https://github.com/mengshukeji/Luckysheet/commit/c1ed417074e89e665f9ef39ee186db9106904c4e))
* **tojson:** api/docs ([8e410f5](https://github.com/mengshukeji/Luckysheet/commit/8e410f5d3cd61724230b3024898d6de3c6c41101))


### Bug Fixes

* **bug:** bug ([ad73f9a](https://github.com/mengshukeji/Luckysheet/commit/ad73f9a679d77721d8af0a483dffe70b90e56412)), closes [#129](https://github.com/mengshukeji/Luckysheet/issues/129)
* **bug:** bug ([801cbe5](https://github.com/mengshukeji/Luckysheet/commit/801cbe5a8040d80f2e672b3607c0b92c922281a9))
* **bug:** bug ([f8716c1](https://github.com/mengshukeji/Luckysheet/commit/f8716c18db05c7ab8bf59d1feb0dc4c3b364c560)), closes [#67](https://github.com/mengshukeji/Luckysheet/issues/67) [#85](https://github.com/mengshukeji/Luckysheet/issues/85)
* **bug:** bug ([0909f5e](https://github.com/mengshukeji/Luckysheet/commit/0909f5e4c957e3d3248a8c86d6e092c5a5396112)), closes [#142](https://github.com/mengshukeji/Luckysheet/issues/142) [#132](https://github.com/mengshukeji/Luckysheet/issues/132)
* **bug:** dataVerification and sheet move and delete cell bug ([4815d86](https://github.com/mengshukeji/Luckysheet/commit/4815d86ce564da43aa1ced3b48d38e88afc39f77))
* **conflict:** conflict ([b11de26](https://github.com/mengshukeji/Luckysheet/commit/b11de26c4d2dbdd7e9d4363558e95d4433f26585))
* **conflict:** toolbar ([8cfa6ac](https://github.com/mengshukeji/Luckysheet/commit/8cfa6ac1bec8bcb156fe45e8c488aa7026b65738))
* **fix  bug with inline string rotate wrap:** add change to max, fix height error ([1988687](https://github.com/mengshukeji/Luckysheet/commit/198868719ffb19738ee5ecc1ee060a0840fa92df))
* **hide row/column:** right click menu ([8070858](https://github.com/mengshukeji/Luckysheet/commit/8070858f6c35f11ee8cf2692d8828d0e78c46d92)), closes [#37](https://github.com/mengshukeji/Luckysheet/issues/37)
* **restore demo:** restore demo ([e799862](https://github.com/mengshukeji/Luckysheet/commit/e7998627400b82bf082bad3c984f4d26e3c9f43a))

### [2.1.3](https://github.com/mengshukeji/Luckysheet/compare/v2.1.2...v2.1.3) (2020-10-22)


### Features

* **api add:** getRowHeight getColumnWidth getDefaultRowHeight getDefaultColumnWidth ([a72f38b](https://github.com/mengshukeji/Luckysheet/commit/a72f38b641a999bdf15281029777222e0bf79e85))
* **api add:** setRowHeight setColumnWidth setSheetZoom setDataVerification deleteDataVerification ([0fd06cc](https://github.com/mengshukeji/Luckysheet/commit/0fd06cc4d7f465967b3bcc91e0b2484ba61b71f6))
* **api add:** setSheetOrder refresh getScreenshot setWorkbookName undo redo ([b2a4617](https://github.com/mengshukeji/Luckysheet/commit/b2a46171c2cfcd9682537a801a1ea68e7e2d3ba0))
* **api and config:** api exitEditMode() scroll() config defaultFontSize ([5eedc48](https://github.com/mengshukeji/Luckysheet/commit/5eedc48a764727bebe09fd626087b158b2979c1e))
* **support spanish:** support Spanish ([41c527c](https://github.com/mengshukeji/Luckysheet/commit/41c527c6f39a8cb3a99d3fc70603f29ab7ba0a82))


### Bug Fixes

* **api:** api ([14d72eb](https://github.com/mengshukeji/Luckysheet/commit/14d72ebe56a2f87f0df5d14595c60e41fe9af077))
* **bug:** postil image zoom ([76dbb5c](https://github.com/mengshukeji/Luckysheet/commit/76dbb5cc613c8290696e917c554aff934050b6a2))
* **destroy function repaire:** repair ([02b9fe7](https://github.com/mengshukeji/Luckysheet/commit/02b9fe75f28a87a475bd0593522b20d030d31b85))
* **event name:** fix ([f64ba54](https://github.com/mengshukeji/Luckysheet/commit/f64ba54455e2a757c72fb4c0110fef2cc5ccdaab))
* **fix focus after formula edit:** fix ([0ee5f31](https://github.com/mengshukeji/Luckysheet/commit/0ee5f31f5ce84c1a7fab2af17ff102790603e3bb))
* **fix text whole text wrap bug:** fix ([ef3d324](https://github.com/mengshukeji/Luckysheet/commit/ef3d324e80bc648080b1e5a53108b30dccf74520))
* **function array value error:** fix it ([31e4b3d](https://github.com/mengshukeji/Luckysheet/commit/31e4b3d9e4cf16f005f8cede059b7cb1cab05031))
* **function update fix:** fix bug ([28835bb](https://github.com/mengshukeji/Luckysheet/commit/28835bb7533087eb16866b4cdaebe94231c7832b))
* **image:** resize and change row or column size ([05c49a2](https://github.com/mengshukeji/Luckysheet/commit/05c49a2fad21706ee7e232fe75d213fed3724109))
* **image fuzzy:** fix it ([8fb1a88](https://github.com/mengshukeji/Luckysheet/commit/8fb1a88669d772a0067edb614e5974ada7301c9c))
* **image zoom:** fix ([1337178](https://github.com/mengshukeji/Luckysheet/commit/1337178a991b4aa99a6e255e50d69e2c8ca47b82))
* **index offset indirect fix:** improve the overall execution efficiency of the function ([7a2f8d0](https://github.com/mengshukeji/Luckysheet/commit/7a2f8d02daf2cc0180adc56dafcfb1d1f6d022ec))
* **inline style:** inline style cell delete bug ([8067a01](https://github.com/mengshukeji/Luckysheet/commit/8067a012ec59a39c5a389d357c3ba2c19bc6acb9))
* **lineheight change to 0.5:** similar to excel ([760378b](https://github.com/mengshukeji/Luckysheet/commit/760378b369b9bf71da0182ea3b413a0accb23c38))
* **more btn:** fix more btn align middle ([c5112e9](https://github.com/mengshukeji/Luckysheet/commit/c5112e9700cd89d4820cbbbefdc0e1d3d0ed940a))
* **more formats toolbar:** fix more formats toolbar can't sync with cell, fix mac delete button can't delete cell, fix can't delete cell with inline-style ([23fcb13](https://github.com/mengshukeji/Luckysheet/commit/23fcb137cb594cfb4bc6dfe2ac86d306c42427f9))
* **selection bug:** fix it ([b83447d](https://github.com/mengshukeji/Luckysheet/commit/b83447d61805192d0310b20e97821eb01b790fb7))
* **setcellvalue delete function fix:** fix it ([00b351f](https://github.com/mengshukeji/Luckysheet/commit/00b351fa0dc01c32cf9c6b8852937e7d2ceb292d))
* **sheet name contains squotes bug:** formla can not execute, when sheet name contains squotes ([fc1dd83](https://github.com/mengshukeji/Luckysheet/commit/fc1dd837d4a3d1639914923201e853e55a865143))
* **text wrap postion bug:** wrap and rotation postion wrong ([9538972](https://github.com/mengshukeji/Luckysheet/commit/9538972f910ed77e02ccb55c0b96386fcf87297b))
* **the bug with first word is space:** fix ti ([6ae8319](https://github.com/mengshukeji/Luckysheet/commit/6ae83196cb50fafbf5657104babd124fac27b818))
* **update number add quote automatically:** similar to excel ([05b01a6](https://github.com/mengshukeji/Luckysheet/commit/05b01a6c95a5d0736c51c5c1ca41e9eb463122d8))
* **validation of "0" values:** fix ([7255c51](https://github.com/mengshukeji/Luckysheet/commit/7255c51d7b46523ff423ee5560b78d18f8535821))

## [2.1.0](https://github.com/mengshukeji/Luckysheet/compare/v2.0.0...v2.1.0) (2020-10-10)


### ⚠ BREAKING CHANGES

* **frozen,docs:** when init workbook and sheet has frozen row or column,you need init sheet's
property frozen

### Features

* **add autocalculationmerge sheet attribute:** it can auto calculate merge infomation ([f7e30cf](https://github.com/mengshukeji/Luckysheet/commit/f7e30cf946f9c5945fd7e69bf4a3273f54e2616f))
* **add force cacultion  formula:** add forceCaculate parameter ([4dd82ad](https://github.com/mengshukeji/Luckysheet/commit/4dd82ad131e0a936c040852657b05ffd53e4b465))
* **api:** add some api functions ([37910ab](https://github.com/mengshukeji/Luckysheet/commit/37910abea38dc37fcb5cc5b905c7b028e3390c10))
* **api:** api ([6f7ca26](https://github.com/mengshukeji/Luckysheet/commit/6f7ca26ba22c47ed0746363dccfd1e392040aed9))
* **api:** api ([66aecbe](https://github.com/mengshukeji/Luckysheet/commit/66aecbe7fe16be03c9c62e1ebbf941c1a9f4bac7))
* **api:** provides an api for users ([b176753](https://github.com/mengshukeji/Luckysheet/commit/b176753ceacba3ab8a243bfe27c5ea8d9455d617))
* **api add:** api add ([e4198fa](https://github.com/mengshukeji/Luckysheet/commit/e4198fa5bda4f6787a3153a113d2be10cfe64fd5))
* **api add:** deleteRangeConditionalFormat clearRange deleteRange ([44cf72a](https://github.com/mengshukeji/Luckysheet/commit/44cf72a1c7592ac5227a92c3e325e7f5088bca30))
* **api add:** setSheetDelete setSheetCopy setSheetHide setSheetShow setSheetName setSheetColor ([62f641f](https://github.com/mengshukeji/Luckysheet/commit/62f641fe7f519b8679c4e006427a74e2e17a8f98))
* **data verification:** data verification ([a661d30](https://github.com/mengshukeji/Luckysheet/commit/a661d303101ee6ebedf22aabb60f7a5a50722b0e))
* **data verification:** data verification ([9cbbbce](https://github.com/mengshukeji/Luckysheet/commit/9cbbbce556444182536bf0a0641c5db22d4a6007))
* **delete cell:** delete cell ([d7de718](https://github.com/mengshukeji/Luckysheet/commit/d7de718d5e6e6308cae1ccf7a7699c3f7d790d8f))
* **draw use sacle:** cancel manual devicePixRatio, use context sacle ([c832283](https://github.com/mengshukeji/Luckysheet/commit/c832283c9709a8393f2c6b74d50e984c7720bb34))
* **drawmain efficiency optimization:** efficiency optimization ([37080fa](https://github.com/mengshukeji/Luckysheet/commit/37080faa39dccb23539d346080baf07ad367c2d7))
* **editor box position fit:** show diffrent position acording to align ([636046d](https://github.com/mengshukeji/Luckysheet/commit/636046dbb2f005c2e6110b3559b72a59a7c67d87))
* **fix:** fix ([9830714](https://github.com/mengshukeji/Luckysheet/commit/983071467d21a5eb1a35c0c427005e95364128db))
* **hide column:** hide column ([9f05959](https://github.com/mengshukeji/Luckysheet/commit/9f05959d4d5fea7fc26e0cedb7217f0be92bcae9))
* **image:** copy and paste ([33d6c96](https://github.com/mengshukeji/Luckysheet/commit/33d6c961bb2d88fa1ba73448c2b808957f750544))
* **image insert:** image insert ([4232dfc](https://github.com/mengshukeji/Luckysheet/commit/4232dfc7832846013e623d13f6157ee1e371bda3))
* **inline string:** finished ([325b66c](https://github.com/mengshukeji/Luckysheet/commit/325b66ccd0e7508535f16a7dfc51acba622cfc14))
* **inline string:** operation like excel ([9ac9f08](https://github.com/mengshukeji/Luckysheet/commit/9ac9f08acf088b614b5318000df2e0d442df21fd))
* **inline string:** when focus cell, show inline string content ([713805c](https://github.com/mengshukeji/Luckysheet/commit/713805cd031ccdf3e5ef1b70da504b635fed85fa))
* **inline string render finished:** begin to develop edit feature ([2ffd9ae](https://github.com/mengshukeji/Luckysheet/commit/2ffd9aedd82e9abaf32b374337503f25d56fd9da))
* **insert image:** insert image ([cf3ba93](https://github.com/mengshukeji/Luckysheet/commit/cf3ba930cadc90e3fc753ac30154974e74089cfc))
* **insert image perfect:** insert image perfect ([ad0a88a](https://github.com/mengshukeji/Luckysheet/commit/ad0a88a8d412202692ce1611f6ac7fe4ac30d2e9))
* **mobile touch event optimized:** very smooth, good experience ([0ed0bf6](https://github.com/mengshukeji/Luckysheet/commit/0ed0bf63ba06895a2ea39c581d0180db6c0d9266))
* **new style:** new style ([5c8d603](https://github.com/mengshukeji/Luckysheet/commit/5c8d603fc41e9c214cb3dca84a147b39f2f6ce06))
* **optimization function:** setCellvalue support any cell param ([9b208e4](https://github.com/mengshukeji/Luckysheet/commit/9b208e4e2eeeaae09dbe75b245c989f98747613a))
* **protection feature:** protection feature similar to Excel ([a71c92a](https://github.com/mengshukeji/Luckysheet/commit/a71c92a5f05aaed6c3df1556a81fc1b2ed97419a))
* **zoom feature beta:** zoom in and zoom out sheet ([249aa02](https://github.com/mengshukeji/Luckysheet/commit/249aa02fa6c74eb854034ee0913a73267b6057cc))
* **zoom gui:** zoom plus and minus, restore origin, slider ([d70dab4](https://github.com/mengshukeji/Luckysheet/commit/d70dab4938ff33e1fcefdd15492279347efe6b33))
* **zoom redo undo suport:** redo undo ([4d03906](https://github.com/mengshukeji/Luckysheet/commit/4d0390675f3aa021f7e15bf529a8102830878202))


### Bug Fixes

* **a few bug fix:** fix ([f07e25d](https://github.com/mengshukeji/Luckysheet/commit/f07e25d0010775b71c1e73cd3ed2db6413d661ca))
* **add button bug:** fix ([3250ef6](https://github.com/mengshukeji/Luckysheet/commit/3250ef69606d24518d7b615806c1210c2ce0a684))
* **allowedit dont work ,when press del:** allowEdit dont work ,when press DEL ([10dccec](https://github.com/mengshukeji/Luckysheet/commit/10dcceccc7f5f04afe70adebb4db59046382abb6))
* **array unique very slow:** fix it ([20f3cb3](https://github.com/mengshukeji/Luckysheet/commit/20f3cb3e2028e455b49a4d1947ac8f02186363af))
* **big data slowly:** speed up ([5109873](https://github.com/mengshukeji/Luckysheet/commit/5109873500996ac4e17abb95899f1fe5950f33b9))
* **blank border position:** fix ([d285d9f](https://github.com/mengshukeji/Luckysheet/commit/d285d9fb5e3ff74385debaf493ad6125173644a4))
* **bug:** bug ([6bb113b](https://github.com/mengshukeji/Luckysheet/commit/6bb113bb4421fc0497f7cf833975e4e2e7544aaa))
* **bug:** bug ([4806de8](https://github.com/mengshukeji/Luckysheet/commit/4806de8de501c08bde6e69be1779b3327ecf2364))
* **bug:** bug ([0cb1ec2](https://github.com/mengshukeji/Luckysheet/commit/0cb1ec23c26e2393a14475d982349a310587e7a7))
* **bug:** bug ([735d1c8](https://github.com/mengshukeji/Luckysheet/commit/735d1c8b5c3777615b20795f70e867e576b8afbf))
* **bug:** bug ([ad1ac61](https://github.com/mengshukeji/Luckysheet/commit/ad1ac6154502193a7e34177a08ce678522d08a03))
* **bug:** bug ([27d1be0](https://github.com/mengshukeji/Luckysheet/commit/27d1be0037c2bd5ba290e7b0f9db229de04582d9))
* **bug:** bug ([dea7bbf](https://github.com/mengshukeji/Luckysheet/commit/dea7bbf44414be31191841443119a3505003522e))
* **bug:** bug ([061ea20](https://github.com/mengshukeji/Luckysheet/commit/061ea2003dca838dffb9ee92d1c43f28c64a9978))
* **bug:** bug ([ba0b047](https://github.com/mengshukeji/Luckysheet/commit/ba0b04752f35f32df82229339bdb3f295fbcecb2))
* **bug:** bug ([7263008](https://github.com/mengshukeji/Luckysheet/commit/726300811a9fdb6e36d19187764aa73daacfc7b7))
* **bug:** bug ([c578c0e](https://github.com/mengshukeji/Luckysheet/commit/c578c0e34b6e589dba2ef29146d894b5c6333676))
* **bug:** bug ([fc8f61b](https://github.com/mengshukeji/Luckysheet/commit/fc8f61b0154f2220c233e680eaf814edfce3a52b))
* **bug:** bug ([fb3b512](https://github.com/mengshukeji/Luckysheet/commit/fb3b5122a5f4e333cca581251ef6d672da767b37))
* **bug:** bug ([6236e5e](https://github.com/mengshukeji/Luckysheet/commit/6236e5e8d6621c0ad829206704bdc2fac684d3bc))
* **bug:** bug ([f057d7d](https://github.com/mengshukeji/Luckysheet/commit/f057d7d281fccc7094c4f806c4590dca39cfbaa0))
* **bug fix:** [#55](https://github.com/mengshukeji/Luckysheet/issues/55) [#50](https://github.com/mengshukeji/Luckysheet/issues/50) [#54](https://github.com/mengshukeji/Luckysheet/issues/54) ([5caf2b0](https://github.com/mengshukeji/Luckysheet/commit/5caf2b028c962e8ca2e6bd1c92fed3e6a9fb462d))
* **bug fix:** pivotTable blank title disapear, merge cell is recognized as range ([47fe25c](https://github.com/mengshukeji/Luckysheet/commit/47fe25c32107e719115a98ceef2ed97ae6161f3b))
* **bugs:** fix issue [#27](https://github.com/mengshukeji/Luckysheet/issues/27) [#29](https://github.com/mengshukeji/Luckysheet/issues/29) ([5d57267](https://github.com/mengshukeji/Luckysheet/commit/5d572676d46692719309c20e536d001ccfe2cd2f))
* **celloverflow border bug:** celloverflow border bug ([86403c2](https://github.com/mengshukeji/Luckysheet/commit/86403c20b329ea4106d6498c33927b714e22941b))
* **change sheet:** change sheet must setTimeOut ([e51457e](https://github.com/mengshukeji/Luckysheet/commit/e51457ef492ae74b77a0298931268b9f14feaa44))
* **change sheet bug:** multiple refresh canvas bug ([7a625e0](https://github.com/mengshukeji/Luckysheet/commit/7a625e0dae187cc7af8e10e3449abf666fd332eb))
* **change sheet scroll bar fix:** change sheet scroll bar dont restore ([02d2655](https://github.com/mengshukeji/Luckysheet/commit/02d26557a52b7cef0cb3b2b8d14996eb29fafa51))
* **chart:** chart ([2be467d](https://github.com/mengshukeji/Luckysheet/commit/2be467d6a4b385d7d7bb0585c9be7a227614a04b))
* **cloumn and row highlight bug:** column and row highlight bar disapear ([c806211](https://github.com/mengshukeji/Luckysheet/commit/c80621118e28f711b1513c869da36989c1a70c8f))
* **columlen:** columlen ([b656c27](https://github.com/mengshukeji/Luckysheet/commit/b656c27a3971b756ea809f4c1010ae28310569da))
* **copy cut paste bug:** bug fix ([ade56d5](https://github.com/mengshukeji/Luckysheet/commit/ade56d5b5ff38dd5095234b71bc89927841fa387))
* **demo fix:** fix ([3d17426](https://github.com/mengshukeji/Luckysheet/commit/3d174260e27793d1634c5f15b83a4aa9ca4100de))
* **demo fix:** fix ([732f678](https://github.com/mengshukeji/Luckysheet/commit/732f6788bcff9ddcf4b0e6bc266b3be9e28eea41))
* **demo fontlist url change:** local path ([feb89b3](https://github.com/mengshukeji/Luckysheet/commit/feb89b301b116745e82a2b17071909d7a4873562))
* **filter option bug:** position error ([3324512](https://github.com/mengshukeji/Luckysheet/commit/33245124be8972d1e011c047caf657275ac76916))
* **fix:** bug fix ([52375dc](https://github.com/mengshukeji/Luckysheet/commit/52375dcb416f435a1adea1fa3abeb486a73d513f))
* **fix:** fix ([194dea1](https://github.com/mengshukeji/Luckysheet/commit/194dea17672cc15e76b364b788f0818299b5e64c))
* **fix bug:** param dont remenber change ([0425e4e](https://github.com/mengshukeji/Luckysheet/commit/0425e4eef2c585873a61efe9ee34496aab40b810))
* **fix bugs:** fix ([bbaafe0](https://github.com/mengshukeji/Luckysheet/commit/bbaafe0d68d670b7621d616db5f91394ded8f573))
* **fix index.html:** fix ([e980cd9](https://github.com/mengshukeji/Luckysheet/commit/e980cd91afee781a004d7e207283e41990b4e45c))
* **fix number to column title bug:** if column title is big , it will show undefined ([2d6e73e](https://github.com/mengshukeji/Luckysheet/commit/2d6e73eb3fba5ebd85b76d22ba4ffdc9c5197b58))
* **fix touch:** touch fix ([d884a69](https://github.com/mengshukeji/Luckysheet/commit/d884a698d6f62aa21bea7d76705682e7406e7973))
* **fix wrap bug:** alt + enter twice bug ([789bab5](https://github.com/mengshukeji/Luckysheet/commit/789bab5e5d712af889577ed141387c02a049f21f))
* **float calculate bug:** fix it ([ef2a96a](https://github.com/mengshukeji/Luckysheet/commit/ef2a96a7cd6d341810b99698f26063862cf33e35))
* **fonts bug on ie:** fit it ([f9a1546](https://github.com/mengshukeji/Luckysheet/commit/f9a1546ca783c058994759dc3443d2e0d9929267))
* **format of  formula cell bug fix:** if cell has format , it is no effect ([1f6ebad](https://github.com/mengshukeji/Luckysheet/commit/1f6ebad36da9de608bc32bddc945a5e3bb68528d))
* **formula -(1-2) error:** fix it ([dee2333](https://github.com/mengshukeji/Luckysheet/commit/dee2333b295aa63fae544c075a98f993c1c3e84c))
* **formula bug:** formula bug ([6c84420](https://github.com/mengshukeji/Luckysheet/commit/6c84420ad4461281ba87378af41cde0e5a7fee93))
* **formula efficiency up:** speed up ([d05151f](https://github.com/mengshukeji/Luckysheet/commit/d05151f474145cb765a60b2f118c222f8b488efb))
* **formula initialization bug:** if formula has cross sheet param, initial this ([c5f6254](https://github.com/mengshukeji/Luckysheet/commit/c5f6254bccd89a90abfa3a6d6728416983ebbb4c))
* **frozen bug:** fix ([91daa07](https://github.com/mengshukeji/Luckysheet/commit/91daa07ec94255f9135d423aa17d9425c0ffe58d))
* **frozen bug and style change:** fix bug ([7cfd0d9](https://github.com/mengshukeji/Luckysheet/commit/7cfd0d914c8999cfd4dbb2bca50f5766645cb108))
* **frozen,docs:** frozen,docs ([e1bd844](https://github.com/mengshukeji/Luckysheet/commit/e1bd844749fa05a7b178565a90bbdba0c81ce1fe))
* **function box input bug:** editor box and function box fix ([4ebb79d](https://github.com/mengshukeji/Luckysheet/commit/4ebb79d67f50dc46f97bc64a0cef0ba8d44e5c12))
* **green label size fix:** fix ([b0734b5](https://github.com/mengshukeji/Luckysheet/commit/b0734b57bb42c55e99eb831c0ca24053ea4aa6a8))
* **hide row and column fix:** add lines ([c430d66](https://github.com/mengshukeji/Luckysheet/commit/c430d6625a23b0f4b8ef903ae62e82833ed0618f))
* **hot key bug fix:** range bug when formula move selection ([f4625d1](https://github.com/mengshukeji/Luckysheet/commit/f4625d1dc38d6f69fddb0ae131d54f65bd7bcbd7))
* **image background opacity:** fix ([d61d3a0](https://github.com/mengshukeji/Luckysheet/commit/d61d3a07e55978350e9e5171537fee1457847209))
* **image,config:** image,config ([2dddfaa](https://github.com/mengshukeji/Luckysheet/commit/2dddfaa8f1a13476f512db0e0d27742ebebb7f35))
* **inline string bug:** style lost when change cell to inline string, input error ([405d90b](https://github.com/mengshukeji/Luckysheet/commit/405d90bfec0c7b47dee64e2034aeec8686c53e32))
* **inline string finished:** fix some bus ([57e7518](https://github.com/mengshukeji/Luckysheet/commit/57e75188ffb718e92251cb9813ae47b467410889))
* **inline string space dont recognize:** fix it ([ddc5c5d](https://github.com/mengshukeji/Luckysheet/commit/ddc5c5dde9a4d4db2ee42207383d696c12c58249))
* **input range bug:** fix it ([5412721](https://github.com/mengshukeji/Luckysheet/commit/5412721675598979689e4de31ec37c2e807c7c16))
* **jquery error:** jquery error ([1a2fed9](https://github.com/mengshukeji/Luckysheet/commit/1a2fed99871d79bcb895af1796909ee3e286e05f))
* **menubutton.js fonts:** fix bug ([1e62de3](https://github.com/mengshukeji/Luckysheet/commit/1e62de3d2f358e99373259600c736ca83601d2ba))
* **mobile text dose not display:** fix bug ([19922c7](https://github.com/mengshukeji/Luckysheet/commit/19922c76dd6afc4991ca3816262d40a6659baa5f))
* **mobile touch:** moubile touch fix ([04e2b8e](https://github.com/mengshukeji/Luckysheet/commit/04e2b8e06965673f807a46fbcda2a403711ec7ea))
* **my english is pool:** fix ([26ff1fd](https://github.com/mengshukeji/Luckysheet/commit/26ff1fd21180e2c795dcc24ed4d4aa2d5ba1f689))
* **no fullscreen bug:** when no fullscreen , div go to top ([64f7d0e](https://github.com/mengshukeji/Luckysheet/commit/64f7d0e6c44c24f21e6e7d8d16beac6f23a5d770))
* **normal style change bug:** fit error ([f24eb7f](https://github.com/mengshukeji/Luckysheet/commit/f24eb7f69c5c9ae53832f130a27473a686720e72))
* **offset indirect formula fix:** fix bug ([d8dfe50](https://github.com/mengshukeji/Luckysheet/commit/d8dfe50782108745e5f132c0bbb1438f7180d198))
* **old chrome dont surport actualboundingboxascent:** fix it and make it beautiful ([5c503d8](https://github.com/mengshukeji/Luckysheet/commit/5c503d851945d5ece1d69c2da8fa26c330d13930))
* **paste bug:** fixed ([76d966f](https://github.com/mengshukeji/Luckysheet/commit/76d966f27eb7632061b97a438d07a63f88704878))
* **pivot table bug:** bug ([9fcc209](https://github.com/mengshukeji/Luckysheet/commit/9fcc209b936eed2057a09b1f070d62832c9801b1))
* **pivot table change sheet bug:** if prevous sheet is pivot table and pennel is closed, change bug ([7cac8e6](https://github.com/mengshukeji/Luckysheet/commit/7cac8e62631d90bea0521498e9980234fde88fc3))
* **pivot table filter bug:** change sheet bug ,after filter pivot table ([c7c1999](https://github.com/mengshukeji/Luckysheet/commit/c7c1999081289c70b6e575e9e37fae82bdfe438c))
* **pivot table show error:** when column area have field and row area is null,pivot table show error ([04bc51c](https://github.com/mengshukeji/Luckysheet/commit/04bc51cf8dc5ff24fc5d71b3bbf755a9787ca57d))
* **remain cell style in inline string mode:** click cell and change cell style like to Excel ([7d0438a](https://github.com/mengshukeji/Luckysheet/commit/7d0438a10db44f371c23daccb9c066f30773e307))
* **render:** render ([40550d6](https://github.com/mengshukeji/Luckysheet/commit/40550d6e59c44e0f47e23f8b5fac4c5e79a5c122))
* **render bug fix:** new render method ([a1bcf81](https://github.com/mengshukeji/Luckysheet/commit/a1bcf81562ebc8c8327baad01d5e814e23fae647))
* **rotate text position mistake, when sheet zoom:** fix zoom bug, fix strike and underline bug ([6680a13](https://github.com/mengshukeji/Luckysheet/commit/6680a134252a65b346b0a99142998ced277e8adf))
* **scroll bug:** scroll bug ([3637fa4](https://github.com/mengshukeji/Luckysheet/commit/3637fa4121340e6278f12104e7877c450e92d511))
* **several bug and new feature:** formula calculation , quotePrefix add ([5a95304](https://github.com/mengshukeji/Luckysheet/commit/5a95304289714d130501faae352dc07fb21dbf68))
* **sheet change arrow:** fix bug ([4a7850b](https://github.com/mengshukeji/Luckysheet/commit/4a7850b86ef1086fe18fa7961a62bbc622ed760d))
* **splines and dynamicarray bug fix:** formula calculation update is finished ([a59aa04](https://github.com/mengshukeji/Luckysheet/commit/a59aa04e4db70e3d90c6109a18ea6a7d2747c156))
* **ssf column resize:** change ([2a09f59](https://github.com/mengshukeji/Luckysheet/commit/2a09f5977e35a388c42d4b43d7fbe6df891234db))
* **store cache:** bug fix ([cbd9014](https://github.com/mengshukeji/Luckysheet/commit/cbd90140e0aae293b40724bce692b861047d47c3))
* **text get wrong height when zoom:** fix height ([106f1fd](https://github.com/mengshukeji/Luckysheet/commit/106f1fd111a75778a2c61424290f33295cec9964))
* **toolbar:** menu button style ([d18478c](https://github.com/mengshukeji/Luckysheet/commit/d18478c0e11cdce994d585be216b9ad95836f073))
* **underline and cancelline:** add and fix ([d3f23ff](https://github.com/mengshukeji/Luckysheet/commit/d3f23fffd72f95b241710e9fdf1a70113502a815))
* **undo redo bug fix:** formula update bug ([373dc4f](https://github.com/mengshukeji/Luckysheet/commit/373dc4f464d8bd106408ce28bd48b9e44b310b5f))
* **update demo:** fix ([e101b91](https://github.com/mengshukeji/Luckysheet/commit/e101b91c4a4a427a83ef727f2e8c2e8166124485))
* **updatecell bug fix:** fix undo redo ([d8b76ce](https://github.com/mengshukeji/Luckysheet/commit/d8b76ce52f25d9fc487ca62b7007c049a4a80160))
* **websocket bux:** bug ([4eda52a](https://github.com/mengshukeji/Luckysheet/commit/4eda52ac89587515d6a20574c0711fe22de0a8c0))
* **zoom scroll position wrong:** fix ([5830e9a](https://github.com/mengshukeji/Luckysheet/commit/5830e9af5a9c8757f55a18b34af2f08ce02f2351))
* **zoom slider drag lag:** fix lag ([17ddd13](https://github.com/mengshukeji/Luckysheet/commit/17ddd13b2e87d3879fa49e1f3569f062400eb251))

## [2.0.0](https://github.com/mengshukeji/Luckysheet/compare/v2.0.0-0...v2.0.0) (2020-07-31)


### ⚠ BREAKING CHANGES

* **api:** 1. luckysheet.flowdata change to luckysheet.flowdata() 2.all apis list in
documentation
* **gulp:** demo index.html's js and css refrence change
* **bug:** bug

bug
* **chart:** add new config : plugins, array
* **main:** bug

### Features

* **cell overflow:** cell overflow ([c3e4f39](https://github.com/mengshukeji/Luckysheet/commit/c3e4f39919e68d99ad72c6a0ae104926acce6b23))
* **chart:** chart ([9991702](https://github.com/mengshukeji/Luckysheet/commit/999170251810720fc4d44012bcc7c70c124463fd))
* **chart:** chart plugin ([196362d](https://github.com/mengshukeji/Luckysheet/commit/196362db053a25ea0deaff14b5019e1450902ceb))
* d ([07d004f](https://github.com/mengshukeji/Luckysheet/commit/07d004f9d63962dc3ad09a32a1d3c61866de5525))
* **allowedit support:** allowEdit support ([59561bb](https://github.com/mengshukeji/Luckysheet/commit/59561bb3453469cbf86703672ec770187545459d))
* **bug fix:** bu ([f23ba5d](https://github.com/mengshukeji/Luckysheet/commit/f23ba5df9b967cd9d8188680723c903ee467bb29))
* **canvas:** canvas ([c63871f](https://github.com/mengshukeji/Luckysheet/commit/c63871fbeabb47d766320800d3bb8be47604690b))
* **chart:** add chart ([139bc6e](https://github.com/mengshukeji/Luckysheet/commit/139bc6ea8510667c4900db6d1b5b26a33fb52734))
* **gloabe improve and bug fix:** global improve and bug fix,include formula,find and replace,filter ([e6cfa31](https://github.com/mengshukeji/Luckysheet/commit/e6cfa3156ac2ec8989f3716601dc27bcfbdc4d13))
* **globalization fix:** pivot table , drop cell ([55d4cf2](https://github.com/mengshukeji/Luckysheet/commit/55d4cf29868787a94377ea2e659da9e74e062628))
* **locale:** locale ([4cd2ee4](https://github.com/mengshukeji/Luckysheet/commit/4cd2ee4cb3f115be9e2455a626469711d8be2c2e))
* **move:** move chart ([cda6df0](https://github.com/mengshukeji/Luckysheet/commit/cda6df0209fb1d440e54d663de682f4749660917))
* **optimiz:** optimization ([abbf592](https://github.com/mengshukeji/Luckysheet/commit/abbf592d2df320d8a44eb5375075cd65f4ef4066))
* **rightclick menu perfect:** add rows and cols  delete rows and cols  hide rows and cols ([32f94a7](https://github.com/mengshukeji/Luckysheet/commit/32f94a72285d6051df87ce45390cb4e5a4cc49b2))
* **scroll style fix beautify:** scroll,sheet color and style ([63f2630](https://github.com/mengshukeji/Luckysheet/commit/63f2630b95ab811807199670db6eee332af882a8))
* **split handler.js to small file:** split handler.js file to seven files ([0a62ff0](https://github.com/mengshukeji/Luckysheet/commit/0a62ff0565d4116ae66a758386ef8d84dcfceba5))
* **zh en:** zh en ([040bfe4](https://github.com/mengshukeji/Luckysheet/commit/040bfe4b456eb910dc7ddbcc3f5ae0e42d440951))
* **zh-cn:** zh-cn ([907226c](https://github.com/mengshukeji/Luckysheet/commit/907226c74297882896f527b9c54a88a11d592a4d))
* **zh-cn:** zh-cn ([01f9521](https://github.com/mengshukeji/Luckysheet/commit/01f9521ed37e11b2e9630b01b84583a45302fc77))


### Bug Fixes

* **bug:** bug ([7dff640](https://github.com/mengshukeji/Luckysheet/commit/7dff64086aaf034a8c427e37ef7b15da96e1123c))
* **bug:** bug ([8baf378](https://github.com/mengshukeji/Luckysheet/commit/8baf378407f67684b77e62bacf6894e4359ed2d3))
* **bug:** bug ([5ebd31e](https://github.com/mengshukeji/Luckysheet/commit/5ebd31e4a455c7547e46c418838e2e3a16def6a7))
* **bug:** bug ([f53addb](https://github.com/mengshukeji/Luckysheet/commit/f53addbf70e96b45d73014d8e181c2712820b5c3))
* **bug:** bug ([9cc36cf](https://github.com/mengshukeji/Luckysheet/commit/9cc36cf40ebb5a4f41b52f230e35d253f8261f69))
* **bug:** bug ([186e3c9](https://github.com/mengshukeji/Luckysheet/commit/186e3c9a557a555d1737d456abf872622004f052))
* **bug:** bug ([447735c](https://github.com/mengshukeji/Luckysheet/commit/447735c7ea365c2c292dd98a4fba8813a9a62d34))
* **bug:** bug ([74639a8](https://github.com/mengshukeji/Luckysheet/commit/74639a8b719db028ab856f95a80d82553c0d919c))
* **bug:** bug ([1082ab0](https://github.com/mengshukeji/Luckysheet/commit/1082ab0e2e84c7863ab29c7b68bb2d9934dcf11c))
* **bug fix:** sparkLines, pivot Table, change to sheet ([69aee1a](https://github.com/mengshukeji/Luckysheet/commit/69aee1aec3200c75cb4897f0f782a945c2ef9fd1))
* **canvas:** canvas,function ([2445ff5](https://github.com/mengshukeji/Luckysheet/commit/2445ff5094fe8da9f7d56612ceb06dd86b75b30e))
* **fix:** fix ([bd6a9bd](https://github.com/mengshukeji/Luckysheet/commit/bd6a9bdd31cefe00a6470fbec9d10471d21fac9f))
* **fix:** fix byg ([d9fb5fe](https://github.com/mengshukeji/Luckysheet/commit/d9fb5fe4c48637d2ac947fe8aa21d6a7ccde0264))
* **fix allowedit:** fix allowEdit attribute ([35820b3](https://github.com/mengshukeji/Luckysheet/commit/35820b3c2ea8437036cfc32911acde9ff32c2fea))
* **from github:** github ([abd44e8](https://github.com/mengshukeji/Luckysheet/commit/abd44e882e39bfb85c0e213e049325754bc3ba4f))
* **hot key and mousemove:** hot key fix ([1ad40cf](https://github.com/mengshukeji/Luckysheet/commit/1ad40cf5521b7b3bd804c2c1f5f13fe6860ab95e))
* **internationalization:** internationalization,formula ([c6901fc](https://github.com/mengshukeji/Luckysheet/commit/c6901fc884d14c5fb8f48a60192f1eb8ad26a485))
* **linestyle bug:** lineStyle ([27ba0a3](https://github.com/mengshukeji/Luckysheet/commit/27ba0a3010865aa0e28158e661bcd6196bc1cfe4))
* **locale:** locale bug ([3bd0cae](https://github.com/mengshukeji/Luckysheet/commit/3bd0cae0502e14c329304bfbf8c0f98c8e7b284e))
* **locale finished and bug fix:** locale finished, condition bug fix , multi range bug fix ([0aa9b3b](https://github.com/mengshukeji/Luckysheet/commit/0aa9b3baa51c818ec2415b9d1c2e838ef32bdc85))
* **locale,formula:** locale,formula ([b11b862](https://github.com/mengshukeji/Luckysheet/commit/b11b86295108d8b25ad2cd7b1ba016b3555cee0d))
* **mac scroll x reverse fix:** mac scroll x reverse fix and scroll optimization ([8eb68e8](https://github.com/mengshukeji/Luckysheet/commit/8eb68e82e2898b1be2702f463c326a304bc96106))
* **main:** bug ([67ebe19](https://github.com/mengshukeji/Luckysheet/commit/67ebe1978bf067c17c74e5b3b7b048055c53c0b4))
* **pivot table bug:** uni ([56181e6](https://github.com/mengshukeji/Luckysheet/commit/56181e610085604666d96aa6068944e05355ec7d))


### build

* **gulp:** gulpfile,index.html,pack js css ([8be0467](https://github.com/mengshukeji/Luckysheet/commit/8be0467dea483be7be2a5af1bc3545a04a67ea72))


* **api:** api ([f19a26e](https://github.com/mengshukeji/Luckysheet/commit/f19a26eab08bc44a5c380afd883d4e730f681062))

### [1.0.1-6](https://github.com/mengshukeji/Luckysheet/compare/v1.0.1-2...v1.0.1-6) (2020-07-14)


### Bug Fixes

* **core.js:** core function ([6e63969](https://github.com/mengshukeji/Luckysheet/commit/6e639699e117abd241532de5530a533b80d547bb))

### [1.0.1-2](https://github.com/mengshukeji/Luckysheet/compare/v1.0.1-1...v1.0.1-2) (2020-07-14)

### [1.0.1-1](https://github.com/mengshukeji/Luckysheet/compare/v1.0.1-0...v1.0.1-1) (2020-07-14)

### 1.0.1-0 (2020-07-14)

## 2.0.0-0 (2020-07-24)


### ⚠ BREAKING CHANGES

* **all project:** File name change

* **all project:** modular,Document promotion,Some bugs ([37c3070](https://github.com/mengshukeji/Luckysheet/commit/37c307087cb50efa9eb3e1f3a22a356024aa43b5)), closes [#11](https://github.com/mengshukeji/Luckysheet/issues/11) [#2](https://github.com/mengshukeji/Luckysheet/issues/2)
