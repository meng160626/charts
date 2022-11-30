<template>
    <main :class="{[themeStore.theme]: true}">
        <header>
            <h1>
                <div class="title">
                    <span>JFG Charts</span>
                    <svg class="icon" viewBox="0 0 1024 1024" width="48" height="48">
                        <path
                            d="M814.250667 159.914667H210.432A39.253333 39.253333 0 0 0 170.666667 198.997333v715.434667a39.253333 39.253333 0 0 0 39.082666 39.253333h365.226667a17.066667 17.066667 0 0 0 13.312-27.136 231.594667 231.594667 0 0 1-38.912-76.458666 17.066667 17.066667 0 0 0-5.12-7.850667l-4.096-3.925333a76.288 76.288 0 0 1-22.528-54.272 256 256 0 0 1 127.829333-221.866667 75.776 75.776 0 0 1 58.026667-7.68l5.802667 1.706667a18.090667 18.090667 0 0 0 9.557333 0 227.84 227.84 0 0 1 113.322667 1.365333 17.066667 17.066667 0 0 0 21.162666-15.189333V198.997333a39.253333 39.253333 0 0 0-39.082666-39.082666z"
                            fill="#FFDEAD" p-id="5054"></path>
                        <path
                            d="M568.149333 153.6V119.466667a34.133333 34.133333 0 0 0-34.133333-34.133334h-44.032a34.133333 34.133333 0 0 0-34.133333 34.133334v34.133333h-55.296v68.266667h223.573333V153.6z"
                            fill="#96DDFF" p-id="5055"></path>
                        <path
                            d="M773.12 784.042667m-156.501333 0a156.501333 156.501333 0 1 0 313.002666 0 156.501333 156.501333 0 1 0-313.002666 0Z"
                            fill="#79DEB4" p-id="5056"></path>
                        <path
                            d="M594.432 784.042667H773.12l-89.429333-154.965334a178.517333 178.517333 0 0 0-89.258667 154.965334z"
                            fill="#FCFEFF" p-id="5057"></path>
                        <path
                            d="M758.272 271.701333H266.410667a17.066667 17.066667 0 0 0-17.066667 17.066667V870.4a17.066667 17.066667 0 0 0 17.066667 17.066667h271.872a17.066667 17.066667 0 0 0 13.653333-7.168 17.066667 17.066667 0 0 0 2.048-15.36c-1.536-4.608-3.242667-9.216-4.608-13.994667a17.066667 17.066667 0 0 0-5.12-7.850667l-4.096-3.925333a76.288 76.288 0 0 1-22.528-54.272 256 256 0 0 1 127.829333-221.866667 75.776 75.776 0 0 1 58.026667-7.68l5.802667 1.706667a18.090667 18.090667 0 0 0 9.557333 0 217.941333 217.941333 0 0 1 40.448-5.632 17.066667 17.066667 0 0 0 15.701333-17.066667V288.426667a17.066667 17.066667 0 0 0-16.725333-16.725334z"
                            fill="#FFF6E6" p-id="5058"></path>
                        <path
                            d="M266.410667 403.114667m-134.144 0a134.144 134.144 0 1 0 268.288 0 134.144 134.144 0 1 0-268.288 0Z"
                            fill="#FFA742" p-id="5059"></path>
                        <path
                            d="M580.266667 920.064H210.432a5.461333 5.461333 0 0 1-5.461333-5.632v-373.76a144.725333 144.725333 0 0 0 44.714666 12.288V870.4a17.066667 17.066667 0 0 0 17.066667 17.066667h209.237333a17.066667 17.066667 0 0 0 0-34.133334h-192.853333V552.96a150.698667 150.698667 0 0 0 97.962667-247.808h360.448v229.205333a17.066667 17.066667 0 0 0 34.133333 0V288.426667a17.066667 17.066667 0 0 0-17.066667-17.066667H341.333333a148.992 148.992 0 0 0-136.533333-5.973333v-66.389334a5.461333 5.461333 0 0 1 5.461333-5.632h173.568V221.866667a17.066667 17.066667 0 0 0 17.066667 17.066666h223.573333a17.066667 17.066667 0 0 0 17.066667-17.066666v-28.501334h172.714667a5.461333 5.461333 0 0 1 5.461333 5.632v351.402667a17.066667 17.066667 0 0 0 34.133333 0V198.997333a39.253333 39.253333 0 0 0-39.082666-39.082666H640.853333V153.6a17.066667 17.066667 0 0 0-17.066666-17.066667h-38.741334V119.466667a51.2 51.2 0 0 0-51.2-50.346667h-43.861333a51.2 51.2 0 0 0-50.346667 51.2v17.066667h-39.082666a17.066667 17.066667 0 0 0-17.066667 17.066666v5.632H210.432A39.253333 39.253333 0 0 0 170.666667 198.997333v86.869334a150.869333 150.869333 0 0 0 0 234.325333v394.24a39.253333 39.253333 0 0 0 39.082666 39.253333H580.266667a17.066667 17.066667 0 0 0 0-34.133333zM489.984 103.936h44.714667a17.066667 17.066667 0 0 1 17.066666 17.066667v17.066666h-78.506666v-17.066666a17.066667 17.066667 0 0 1 16.725333-17.066667zM417.28 170.666667h190.122667v34.133333H417.28zM148.992 403.114667a117.418667 117.418667 0 1 1 117.76 117.248 117.589333 117.589333 0 0 1-117.76-117.248z"
                            fill="#3D3D63" p-id="5060"></path>
                        <path
                            d="M773.12 610.816a174.592 174.592 0 0 0-71.509333 15.701333l-3.413334-5.802666a17.066667 17.066667 0 0 0-22.869333-6.314667 196.437333 196.437333 0 0 0-97.621333 169.472 17.066667 17.066667 0 0 0 17.066666 17.066667h6.314667A173.226667 173.226667 0 1 0 773.12 610.816z m-95.061333 41.984L744.106667 768h-131.925334a162.816 162.816 0 0 1 65.877334-115.2z m95.061333 271.018667a139.776 139.776 0 0 1-138.581333-123.050667h138.581333a17.066667 17.066667 0 0 0 14.506667-25.088l-69.290667-119.466667a139.776 139.776 0 1 1 54.784 267.605334zM415.232 588.629333a17.066667 17.066667 0 0 0-23.722667 0L341.333333 638.122667a17.066667 17.066667 0 0 0 0 23.722666 16.042667 16.042667 0 0 0 11.776 4.949334 17.066667 17.066667 0 0 0 11.946667-4.949334l37.546667-37.546666 34.133333 34.133333a17.066667 17.066667 0 0 0 23.722667 0l64.341333-64.512 29.354667 29.354667a17.066667 17.066667 0 0 0 23.722666 0L682.666667 520.021333a17.066667 17.066667 0 0 0 0-23.722666 17.066667 17.066667 0 0 0-23.722667 0l-91.818667 91.989333-29.354666-29.354667a17.066667 17.066667 0 0 0-23.722667 0l-64.512 64.512zM220.672 419.157333a44.202667 44.202667 0 0 0 34.133333 4.437334l32.426667-8.704a10.752 10.752 0 0 1 8.533333 1.194666 10.069333 10.069333 0 0 1 5.12 6.656 11.264 11.264 0 0 1-7.850666 13.824l-48.64 12.970667a17.066667 17.066667 0 0 0 4.437333 32.938667c1.365333 0 20.48-4.949333 20.48-4.949334l1.536 5.461334a17.066667 17.066667 0 0 0 16.042667 12.458666 13.312 13.312 0 0 0 4.437333 0 17.066667 17.066667 0 0 0 11.776-20.48l-1.365333-5.461333a44.714667 44.714667 0 1 0-23.210667-86.357333l-32.256 8.704a11.434667 11.434667 0 0 1-8.533333-1.024 11.776 11.776 0 0 1-5.290667-6.826667 11.264 11.264 0 0 1 8.021333-13.653333l48.469334-13.141334a17.066667 17.066667 0 0 0 11.946666-20.48A17.066667 17.066667 0 0 0 279.893333 324.266667l-16.042666 4.437333-1.536-5.461333a17.066667 17.066667 0 0 0-32.426667 8.704l1.536 5.461333a44.714667 44.714667 0 0 0-10.752 81.92zM671.232 358.4H470.016a17.066667 17.066667 0 1 0 0 34.133333h201.216a17.066667 17.066667 0 1 0 0-34.133333zM671.232 414.208h-123.050667a17.066667 17.066667 0 0 0 0 34.133333h123.050667a17.066667 17.066667 0 0 0 0-34.133333z"
                            fill="#3D3D63" p-id="5061"></path>
                    </svg>
                </div>
                <el-popover trigger="click">
                    <template #reference>
                        <svg style="cursor: pointer;" width="48" height="48" viewBox="0 0 72 72">
                            <g id="color">
                                <path fill="#D0CFCE" stroke="none"
                                    d="M51.2579,29.8111c0,0-1.8149-0.4504-1.0786-2.0742l4.5037-7.4841l-3.6502-3.417l-0.73-0.6833 l-7.1357,4.6903c-0.9431,0.4213-2.037-0.1166-2.2794-1.1205l-1.887-7.8158h-5h-1l-1.8809,7.7858 c-0.2389,0.9894-1.3101,1.5798-2.2425,1.1716c-0.0148-0.0063-0.0296-0.0131-0.0445-0.0198l-7.1357-4.6904l-0.73,0.6833 l-3.6502,3.417l4.5037,7.4841c0.7364,1.6238-1.0785,2.0743-1.0785,2.0743l-8.4766,2.1074l0.1649,4.9972l0.033,0.9995 l8.3622,1.7291c0.952,0.3641,1.3501,1.4954,0.8358,2.3755l-0.0328,0.0562l-4.5037,7.484l3.6502,3.417l0.73,0.6833l7.1357-4.6902 c0.0149-0.0068,0.03-0.0129,0.0445-0.02c0,0,0.0115-0.0042,0.0332-0.0111c1.1606-0.3768,2.393,0.3463,2.6794,1.5325l1.7947,7.4336 h1h5l1.887-7.8158c0.2424-1.0039,1.3364-1.5417,2.2794-1.1205l7.1357,4.6903l0.73-0.6833l3.6502-3.417l-4.5037-7.4841 l-0.0328-0.0562c-0.5143-0.88-0.1162-2.0112,0.8358-2.3755l8.3622-1.729l0.033-0.9995l0.1649-4.9973L51.2579,29.8111z M36,44.9064 c-5.5228,0-10-4.4772-10-10s4.4772-10,10-10s10,4.4772,10,10S41.5228,44.9064,36,44.9064z" />
                                <path fill="#9B9B9A" stroke="none"
                                    d="M36,24.9064c-5.5228,0-10,4.4772-10,10s4.4772,10,10,10s10-4.4772,10-10S41.5228,24.9064,36,24.9064z M36,39.9064c-2.7614,0-5-2.2386-5-5c0-2.7615,2.2386-5,5-5s5,2.2385,5,5C41,37.6678,38.7614,39.9064,36,39.9064z" />
                            </g>
                            <g id="hair" />
                            <g id="skin" />
                            <g id="skin-shadow" />
                            <g id="line">
                                <circle cx="36" cy="34.9064" r="5" fill="none" stroke="#000000" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                                <circle cx="36" cy="34.9064" r="10" fill="none" stroke="#000000" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                                <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-miterlimit="10" stroke-width="2"
                                    d="M31.1191,19.6921c-0.2389,0.9895-1.31,1.5799-2.2425,1.1717c-0.0147-0.0065-0.0296-0.0131-0.0445-0.0199l-7.1357-4.6903 l-0.73,0.6834l-3.6502,3.417l4.5037,7.484c0.7363,1.6239-1.0785,2.0744-1.0785,2.0744l-8.4766,2.1074l0.1649,4.9973l0.033,0.9995 l8.3622,1.7291h0c0.9521,0.3641,1.3501,1.4954,0.8359,2.3754l-0.0328,0.0562l-4.5037,7.484l3.6502,3.417l0.73,0.6834 l7.1357-4.6903c0.0149-0.0068,0.03-0.0129,0.0445-0.0199c0,0,0.0116-0.0042,0.0332-0.0112 c1.1606-0.3768,2.393,0.3463,2.6794,1.5324l1.7947,7.4336h1h5l1.8869-7.8157c0.2424-1.004,1.3364-1.5418,2.2794-1.1205h0 l7.1357,4.6903l0.73-0.6834l3.6502-3.417l-4.5037-7.484l-0.0328-0.0562c-0.5143-0.8801-0.1162-2.0113,0.8359-2.3755l0,0 l8.3622-1.7291l0.033-0.9995l0.1649-4.9973l-8.4766-2.1074c0,0-1.8149-0.4505-1.0785-2.0744l4.5037-7.484l-3.6502-3.417 l-0.73-0.6834l-7.1357,4.6903v0c-0.943,0.4212-2.037-0.1166-2.2794-1.1206L39,11.9064h-5h-1L31.1191,19.6921" />
                            </g>
                        </svg>
                    </template>
                    <template #default>
                        <div style="--theme-color: #002bdc;" class="theme-li" @click="onThemeChange('blue')"></div>
                        <div style="--theme-color: #ff0080;" class="theme-li" @click="onThemeChange('pink')"></div>
                    </template>
                </el-popover>
            </h1>
        </header>
        <section>
            <div class="introductory">一个菜鸡的图表库</div>
            <span :class="{'rainbow-btn': true, [themeStore.theme]: true}" @click="onClick">所有示例</span>
            <span :class="{'rainbow-btn': true, [themeStore.theme]: true}" @click="onClick">
                在线编辑
                <!-- bird svg -->
                <svg width="60px" height="60px" id="bird" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="color">
                        <path fill="#d0cfce" stroke-width="2"
                            d="m19.16 40.04 0.4275-2.06c-1.417-1.417-1.523-2.998-1.462-3.717 0.04535-0.5339-0.206-4.356 6.538-10.89 0.6766-0.6558 1.265-1.384 1.735-2.201 0.9457-1.645 2.712-4.998 5.3-11.03 3.851-8.978 8.116 12.15 7.396 18.19-0.09423 0.7913-0.9772 5.316-1.11 6.102l-2.88 10.79" />
                        <path fill="#fff" stroke-width="2"
                            d="m37.99 46.28c28.77-0.928 18.56-38.05 17.63-33.41-0.928 4.64-27.84 31.55-30.62 27.84-2.784-3.712-6.496-4.64-8.352-1.856-1.856 2.784-2.784 3.712-2.784 3.712s5.568-0.928 6.496 0.928c0.928 1.856 3.871 7.946 9.28 8.352 0 0 1.847 0.6304 5.568 8.352 4.339 9.004 22.27 0 16.7-4.64-5.568-4.64-9.28-2.784-12.06-4.64-2.784-1.856-1.856-4.64-1.856-4.64z" />
                    </g>
                    <g id="hair" />
                    <g id="skin" />
                    <g id="skin-shadow" />
                    <g id="line">
                        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="m38.29 46.13c28.36-0.9149 18.3-37.51 17.38-32.93s-27.44 31.1-30.19 27.44c-2.744-3.659-6.404-4.574-8.233-1.83-1.83 2.744-2.744 3.659-2.744 3.659s5.489-0.9149 6.404 0.9149c0.9149 1.83 3.816 7.833 9.148 8.233 0 0 1.821 0.6215 5.489 8.233 4.277 8.876 21.96 0 16.47-4.574-5.489-4.574-9.148-2.744-11.89-4.574-2.744-1.83-1.83-4.574-1.83-4.574z" />
                        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="m38.37 26.51c0.3138-7.019-3.262-24.11-6.481-16.06-3.659 9.148-5.489 11.89-5.489 11.89-4.348 4.13-5.957 7.228-6.529 9.162" />
                    </g>
                </svg>
            </span>

            <!-- svg 盒子 -->
            <div class="svg-container">
                <!-- satellite-path svg -->
                <svg class="svg-path" width="500px" height="500px" viewBox="0 0 100 100">
                    <path d="M10,50 a 40, 40 0 1,0 80,0 a 40, 40 0 1,0 -80,0" id="satellite-path" fill="transparent"
                        :stroke="themeStore.theme === 'blue' ? '#4af' : '#ef929b'" stroke-dasharray="20" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <!-- satellite svg -->
                <svg class="svg-icon" width="60px" height="60px" id="satellite" viewBox="0 0 72 72" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="color">
                        <path fill="#d0cfce" stroke="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M24.2814,24.4049c3.6326-3.6326,3.934-9.4125,0.8702-13.3997c-0.3699-0.4815-1.0826-0.53-1.512-0.1007L11.0003,23.5439 c-0.4196,0.4196-0.3828,1.1114,0.0737,1.4905C14.9386,28.2441,20.6405,28.0457,24.2814,24.4049z" />
                        <path fill="#3f3f3f" stroke="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M15.7278,67.7278L4.4142,56.4142c-0.3906-0.3906-0.3906-1.0237,0-1.4143l15.1005-15.1005c0.3905-0.3905,1.0236-0.3905,1.4142,0 l11.3137,11.3137c0.3905,0.3906,0.3905,1.0237,0,1.4142L17.1421,67.7278C16.7515,68.1184,16.1184,68.1184,15.7278,67.7278z" />
                        <path fill="#3f3f3f" stroke="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M51.2131,32.2426L39.8994,20.9289c-0.3905-0.3905-0.3905-1.0237,0-1.4142L54.9999,4.4142c0.3906-0.3906,1.0237-0.3906,1.4143,0 l11.3136,11.3136c0.3906,0.3906,0.3906,1.0237,0,1.4143L52.6273,32.2426C52.2368,32.6331,51.6036,32.6331,51.2131,32.2426z" />
                        <path fill="#d0cfce" stroke="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M51.9203,39.1924L39.1924,51.9203c-0.3905,0.3905-1.0237,0.3905-1.4142,0L23.636,37.7782c-0.3905-0.3905-0.3905-1.0237,0-1.4142 l12.728-12.728c0.3905-0.3905,1.0237-0.3905,1.4142,0l14.1421,14.1422C52.3108,38.1687,52.3108,38.8019,51.9203,39.1924z" />
                        <path fill="#9b9b9a" stroke="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M36.364,23.636L23.636,36.364c-0.3905,0.3905-1.0237,0.3905-1.4142,0l-4.2426-4.2427c-0.3905-0.3905-0.3905-1.0237,0-1.4142 l12.7279-12.7279c0.3905-0.3905,1.0237-0.3905,1.4142,0l4.2427,4.2426C36.7545,22.6123,36.7545,23.2455,36.364,23.636z" />
                        <path fill="#9b9b9a" stroke="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M53.3345,44.8492l-8.4853,8.4853c-0.3905,0.3905-1.0236,0.3905-1.4142,0l-2.1213-2.1213c-0.3905-0.3905-0.3905-1.0237,0-1.4142 l8.4853-8.4853c0.3905-0.3905,1.0237-0.3905,1.4142,0l2.1213,2.1213C53.725,43.8256,53.725,44.4587,53.3345,44.8492z" />
                        <ellipse cx="12.3223" cy="12.3223" rx="2" ry="2"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.1041 12.3223)" fill="#3f3f3f"
                            stroke="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                            stroke-width="2" />
                    </g>
                    <g id="hair" />
                    <g id="skin" />
                    <g id="skin-shadow" />
                    <g id="line">
                        <line x1="45.5" x2="43.07" y1="26.5" y2="28.93" fill="none" stroke="#000000"
                            stroke-miterlimit="10" stroke-width="2" />
                        <polyline fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2"
                            points="28.93,43.07 26.52,45.49 26,46" />
                        <line x1="12" x2="12" y1="14" y2="22" fill="none" stroke="#000000" stroke-miterlimit="10"
                            stroke-width="2" />
                        <line x1="23" x2="14" y1="12" y2="12" fill="none" stroke="#000000" stroke-miterlimit="10"
                            stroke-width="2" />
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M24.2814,24.4049c3.6326-3.6326,3.934-9.4125,0.8702-13.3997c-0.3699-0.4815-1.0826-0.53-1.512-0.1007L11.0003,23.5439 c-0.4196,0.4196-0.3828,1.1114,0.0737,1.4905C14.9386,28.2441,20.6405,28.0457,24.2814,24.4049z" />
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M15.7278,67.7278L4.4142,56.4142c-0.3906-0.3906-0.3906-1.0237,0-1.4143l15.1005-15.1005c0.3905-0.3905,1.0236-0.3905,1.4142,0 l11.3137,11.3137c0.3905,0.3906,0.3905,1.0237,0,1.4142L17.1421,67.7278C16.7515,68.1184,16.1184,68.1184,15.7278,67.7278z" />
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M51.2131,32.2426L39.8994,20.9289c-0.3905-0.3905-0.3905-1.0237,0-1.4142L54.9999,4.4142c0.3906-0.3906,1.0237-0.3906,1.4143,0 l11.3136,11.3136c0.3906,0.3906,0.3906,1.0237,0,1.4143L52.6273,32.2426C52.2368,32.6331,51.6036,32.6331,51.2131,32.2426z" />
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M51.9203,39.1924L39.1924,51.9203c-0.3905,0.3905-1.0237,0.3905-1.4142,0L23.636,37.7782c-0.3905-0.3905-0.3905-1.0237,0-1.4142 l12.728-12.728c0.3905-0.3905,1.0237-0.3905,1.4142,0l14.1421,14.1422C52.3108,38.1687,52.3108,38.8019,51.9203,39.1924z" />
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M36.364,23.636L23.636,36.364c-0.3905,0.3905-1.0237,0.3905-1.4142,0l-4.2426-4.2427c-0.3905-0.3905-0.3905-1.0237,0-1.4142 l12.7279-12.7279c0.3905-0.3905,1.0237-0.3905,1.4142,0l4.2427,4.2426C36.7545,22.6123,36.7545,23.2455,36.364,23.636z" />
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="M53.3345,44.8492l-8.4853,8.4853c-0.3905,0.3905-1.0236,0.3905-1.4142,0l-2.1213-2.1213c-0.3905-0.3905-0.3905-1.0237,0-1.4142 l8.4853-8.4853c0.3905-0.3905,1.0237-0.3905,1.4142,0l2.1213,2.1213C53.725,43.8256,53.725,44.4587,53.3345,44.8492z" />
                        <ellipse cx="12.3223" cy="12.3223" rx="2" ry="2"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.1041 12.3223)" fill="none"
                            stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                            stroke-width="2" />
                    </g>
                </svg>
                <!-- bar-chart svg -->
                <svg class="svg-icon" width="60px" height="60px" id="bar-chart" viewBox="0 0 72 72"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="color">
                        <rect x="12.05" y="12.05" width="47.9" height="47.9" fill="#fff" />
                        <rect x="18.32" y="37.6" width="8" height="21.41" fill="#b1cc33" />
                        <rect x="46.25" y="44.38" width="8" height="14.62" fill="#92d3f5" />
                        <rect x="32.28" y="21.69" width="8" height="37.32" fill="#d22f27" />
                    </g>
                    <g id="hair" />
                    <g id="skin" />
                    <g id="skin-shadow" />
                    <g id="line">
                        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2" d="m18.03 59.01v-21.41h8v21.41" />
                        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2" d="m45.97 59.01v-14.62h8v14.62" />
                        <line x1="12.75" x2="28.49" y1="31.28" y2="31.28" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="43.51" x2="59.45" y1="40.82" y2="40.82" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="57.48" x2="59.17" y1="50.37" y2="50.37" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <rect x="12.05" y="12.05" width="47.9" height="47.9" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2" d="m32 59.01v-37.28h8v37.28" />
                        <line x1="12.39" x2="14.52" y1="40.82" y2="40.82" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="12.39" x2="14.52" y1="50.37" y2="50.37" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="43.51" x2="59.45" y1="31.28" y2="31.28" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="43.51" x2="59.45" y1="21.74" y2="21.74" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="12.75" x2="28.49" y1="21.74" y2="21.74" fill="none" stroke="#000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                    </g>
                </svg>
                <!-- bar-chart-path svg -->
                <svg class="svg-path" width="500px" height="500px" viewBox="0 0 100 100">
                    <g style="transform: rotate(120deg); transform-origin: 50% 50%;">
                        <path d="M10,50 a 40, 40 0 1,0 80,0 a 40, 40 0 1,0 -80,0" id="bar-chart-path" fill="transparent"
                            stroke="transparent" stroke-dasharray="20" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </g>
                </svg>
                <!-- line-path svg -->
                <svg class="svg-path" width="500px" height="500px" viewBox="0 0 100 100">
                    <path d="M75,50 a 25, 25 1 0,1 -50,0 a 25, 25 1 0,1 50,0" id="line-chart-path" fill="transparent"
                    :stroke="themeStore.theme === 'blue' ? '#1579d8' : '#eb3e4c'" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <!-- line-chart svg -->
                <svg class="svg-icon" width="60px" height="60px" id="line-chart" viewBox="0 0 72 72"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="color">
                        <path fill="#fff" d="m12.05 59.91h47.9v-47.9h-47.9z" />
                        <path fill="#92d3f5" stroke="none"
                            d="M31.2379,28.4166l-6.8898-8.6812l-2.8384,2.5491l8.7131,11.7972l6.5938-3.5617 c0.1425-0.0713,11.2762,21.2218,11.2762,21.2218l3.397-1.4527L39.0546,25.2048C39.0546,25.2048,31.5269,28.8004,31.2379,28.4166z" />
                    </g>
                    <g id="hair" />
                    <g id="skin" />
                    <g id="skin-shadow" />
                    <g id="line">
                        <polygon fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            points="47.9061,52.0658 37.261,30.5927 29.9089,34.2373 21.1514,22.14 24.3481,19.7354 31.358,29.0544 35.4843,27.0088 35.4708,26.9815 39.0546,25.2048 51.4898,50.2891" />
                        <rect x="12.0515" y="12.0154" width="47.897" height="47.8969" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="51.8392" x2="59.8051" y1="36.085" y2="36.085" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="12.739" x2="26.0395" y1="36.085" y2="36.085" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="55.2074" x2="59.6829" y1="47.9928" y2="47.9928" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="12.739" x2="41.3609" y1="47.9928" y2="47.9928" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="48.2339" x2="48.2509" y1="56.0805" y2="59.3704" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="48.033" x2="48.1527" y1="12.0588" y2="34.5045" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="36.1837" x2="36.1837" y1="38.1825" y2="59.5732" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="36.1837" x2="36.1837" y1="12.3297" y2="22.2845" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="24.2253" x2="24.2253" y1="33.3016" y2="59.5732" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="24.2253" x2="24.2253" y1="12.1204" y2="15.6523" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="43.2552" x2="59.2261" y1="24.1772" y2="24.1772" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                        <line x1="12.2635" x2="17.5519" y1="24.1772" y2="24.1772" fill="none" stroke="#000000"
                            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                    </g>
                </svg>
                <img @click="onClick" id="headshot" src="../assets/images/headshot.jpg" alt="" />
            </div>
        </section>
        <!-- 底部海浪 -->
        <footer>
            <svg width="100%" height="534px" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg"
                class="transition duration-300 ease-in-out delay-150">
                <defs>
                    <linearGradient id="gradient-blue" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="5%" stop-color="#002bdc"></stop>
                        <stop offset="95%" stop-color="#32ded4"></stop>
                    </linearGradient>
                    <linearGradient id="gradient-pink" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="5%" stop-color="#ff78bc"></stop>
                        <stop offset="95%" stop-color="#ff0080"></stop>
                    </linearGradient>
                </defs>
                <path
                    d="M 0,400 C 0,400 0,133 0,133 C 124.33492822966508,144.57894736842104 248.66985645933016,156.1578947368421 335,168 C 421.33014354066984,179.8421052631579 469.6555023923445,191.94736842105263 548,182 C 626.3444976076555,172.05263157894737 734.7081339712918,140.05263157894737 830,124 C 925.2918660287082,107.94736842105263 1007.511961722488,107.8421052631579 1107,112 C 1206.488038277512,116.1578947368421 1323.244019138756,124.57894736842104 1440,133 C 1440,133 1440,400 1440,400 Z"
                    stroke="none" stroke-width="0" :fill="`url(#gradient-${themeStore.theme})`" fill-opacity="0.53"
                    class="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                <path
                    d="M 0,400 C 0,400 0,266 0,266 C 72.22009569377991,284.2200956937799 144.44019138755982,302.4401913875598 254,312 C 363.5598086124402,321.5598086124402 510.4593301435407,322.4593301435407 602,312 C 693.5406698564593,301.5406698564593 729.7224880382776,279.7224880382775 827,280 C 924.2775119617224,280.2775119617225 1082.6507177033493,302.6507177033493 1195,304 C 1307.3492822966507,305.3492822966507 1373.6746411483255,285.67464114832535 1440,266 C 1440,266 1440,400 1440,400 Z"
                    stroke="none" stroke-width="0" :fill="`url(#gradient-${themeStore.theme})`" fill-opacity="1"
                    class="transition-all duration-300 ease-in-out delay-150 path-1"></path>
            </svg>
        </footer>
    </main>
</template>

<script setup lang='ts'>
import { useThemeStore } from '@/stores/theme';
import { ElMessage } from 'element-plus';
import { gsap, Linear } from 'gsap';
import { onMounted } from 'vue';

onMounted(() => {
    gsap.to("#satellite", {
        duration: 6,
        repeat: -1,
        ease: Linear.easeNone,
        motionPath: {
            path: "#satellite-path", // 沿着轨迹运动
            align: "#satellite-path",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        }
    });
    gsap.to("#satellite-path", {
        duration: 8,
        repeat: -1,
        ease: "back.out(1.7)",
        rotation: 180,
        transformOrigin: '50% 50%'
    });
    gsap.to("#bar-chart", {
        duration: 6,
        repeat: -1,
        ease: Linear.easeNone,
        motionPath: {
            path: "#bar-chart-path", // 沿着轨迹运动
            align: "#bar-chart-path",
            alignOrigin: [0.5, 0.5]
        }
    });
    gsap.to("#line-chart", {
        duration: 6,
        repeat: -1,
        ease: Linear.easeNone,
        motionPath: {
            path: "#line-chart-path", // 沿着轨迹运动
            align: "#line-chart-path",
            alignOrigin: [0.5, 0.5]
        }
    });
});

// 点击事件
const onClick = function () {
    ElMessage({
        message: '该功能尚未开发',
        type: 'error'
    });
};

// 主题控制
const _themeList = ['blue', 'pink'];
const themeStore = useThemeStore();
const onThemeChange = function(theme: string) {
    themeStore.changeTheme(theme);
}

</script>

<style scoped lang="scss">
main {
    width: 100%;
    height: 100%;
    position: relative;

    &.blue {
        --shadow: #1579d8;
    }
    &.pink {
        --shadow: #a61b29;
    }
}

header {
    h1 {
        color: #333;
        display: flex;
        align-items: center;
        font-size: 48px;
        justify-content: space-between;
        padding-right: 50px;

        div {
            text-indent: 2em;
            display: flex;
            align-items: center;
        }
    }
}
.theme-li {
    height: 30px;
    width: 100%;
    background-color: var(--theme-color);
    cursor: pointer;
}

/* 打印效果 */
@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 8em;
    }
}

/* 光标 */
@keyframes blink-caret {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: currentColor;
    }
}

/* 关键帧动画 */
@keyframes bg-linear {
    0% {
        background-position: 0%;
    }

    100% {
        background-position: 400%;
    }
}

/* 路径长度渐变动画 */
@keyframes path-length {
    0% {
        stroke-dasharray: 5 5;
    }

    20% {
        stroke-dasharray: 5 50;
    }

    30% {
        stroke-dasharray: 20 25;
    }

    40% {
        stroke-dasharray: 25 15;
    }

    50% {
        stroke-dasharray: 30 10;
    }

    60% {
        stroke-dasharray: 20 10;
    }

    70% {
        stroke-dasharray: 12 10;
    }

    80% {
        stroke-dasharray: 10 5;
    }

    100% {
        stroke-dasharray: 5 5;
    }
}

/* 透明度渐变 */
@keyframes opacity {
    0% {
        opacity: 0%;
    }

    50% {
        opacity: 100%;
    }

    100% {
        opacity: 0%;
    }
}

@keyframes logo {
    0% {
        transform: none;
        filter: blur(3px);
    }

    50% {
        transform: scale(1.2);
        filter: none;
    }

    100% {
        transform: none;
        filter: blur(3px);
    }
}

section {
    position: relative;
    top: 30%;

    .rainbow-btn {
        color: rgba(255, 255, 255, 0.8);
        text-transform: uppercase;
        font-weight: 700;
        font-size: 24px;
        display: inline-block;
        width: 190px;
        position: relative;
        height: 50px;
        border-radius: 33px;
        text-align: center;
        line-height: 50px;
        transition: all .4s;
        z-index: 2;
        left: 20.5%;
        transform: translate(-50%, -50%);
        cursor: pointer;

        &.blue {
            background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
            background-size: 400%;
        }
        &.pink {
            background: linear-gradient(90deg, #f441a5, #ffeb3b, #03a9f4, #f441a5);
        background-size: 400%;
        }
        &:hover {
            animation: bg-linear 8s linear infinite;
        }

        &+.rainbow-btn {
            margin-left: 18px;
        }

        #bird {
            position: absolute;
            top: -40px;
            right: -15px;
        }
    }

    .introductory {
        color: #333;
        font-size: 2em;
        width: 8em;
        height: 1.5em;
        border-right: 1px solid transparent;
        animation: typing 2s steps(16, end), blink-caret .75s step-end infinite;
        font-family: Consolas, Monaco;
        word-break: break-all;
        overflow: hidden;
        position: absolute;
        top: -80px;
        left: 25%;
        transform: translate(-50%, -50%);
    }

    .svg-container {
        width: 500px;
        height: 500px;
        position: absolute;
        z-index: 2;
        left: 50%;
        transform: translateY(-300px);

        .svg-icon {
            position: absolute;

            &#satellite {
                left: 65%;
                top: 30%;
                animation: opacity 5s ease-in-out infinite;
            }
        }

        .svg-path {
            position: absolute;
            left: 0;
            top: 0;

            #line-chart-path {
                animation: path-length 5s ease-in-out infinite;
            }
        }

        #headshot {
            position: absolute;
            left: 190px;
            top: 190px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            box-shadow: 0 0 4px 3px var(--shadow);
            cursor: pointer;
            background-repeat: no-repeat;
            background-size: contain;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            animation: logo 5s ease-in-out infinite;

            &:hover {
                filter: none;
                transform: scale(1.2);
                animation: none;
            }
        }
    }
}

footer {
    svg {
        position: absolute;
        bottom: 0;
        display: block;
    }

    .path-0 {
        animation: pathAnim-0 4s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    .path-1 {
        animation: pathAnim-1 4s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
}

@keyframes pathAnim-0 {
    0% {
        d: path("M 0,400 C 0,400 0,133 0,133 C 124.33492822966508,144.57894736842104 248.66985645933016,156.1578947368421 335,168 C 421.33014354066984,179.8421052631579 469.6555023923445,191.94736842105263 548,182 C 626.3444976076555,172.05263157894737 734.7081339712918,140.05263157894737 830,124 C 925.2918660287082,107.94736842105263 1007.511961722488,107.8421052631579 1107,112 C 1206.488038277512,116.1578947368421 1323.244019138756,124.57894736842104 1440,133 C 1440,133 1440,400 1440,400 Z");
    }

    25% {
        d: path("M 0,400 C 0,400 0,133 0,133 C 108.23923444976077,107.69856459330143 216.47846889952154,82.39712918660287 326,90 C 435.52153110047846,97.60287081339713 546.3253588516745,138.11004784688998 626,150 C 705.6746411483255,161.88995215311002 754.2200956937799,145.1626794258373 833,143 C 911.7799043062201,140.8373205741627 1020.7942583732058,153.23923444976077 1127,154 C 1233.2057416267942,154.76076555023923 1336.6028708133972,143.8803827751196 1440,133 C 1440,133 1440,400 1440,400 Z");
    }

    50% {
        d: path("M 0,400 C 0,400 0,133 0,133 C 105.87559808612443,118.23444976076556 211.75119617224885,103.4688995215311 313,96 C 414.24880382775115,88.5311004784689 510.87081339712915,88.35885167464113 607,98 C 703.1291866028708,107.64114832535887 798.7655502392345,127.09569377990428 887,143 C 975.2344497607655,158.90430622009572 1056.066985645933,171.25837320574163 1147,169 C 1237.933014354067,166.74162679425837 1338.9665071770335,149.87081339712918 1440,133 C 1440,133 1440,400 1440,400 Z");
    }

    75% {
        d: path("M 0,400 C 0,400 0,133 0,133 C 112.4114832535885,140.38755980861242 224.822966507177,147.77511961722487 303,145 C 381.177033492823,142.22488038277513 425.11961722488047,129.28708133971293 528,134 C 630.8803827751195,138.71291866028707 792.6985645933014,161.07655502392348 914,166 C 1035.3014354066986,170.92344497607652 1116.0861244019138,158.40669856459328 1197,150 C 1277.9138755980862,141.59330143540672 1358.956937799043,137.29665071770336 1440,133 C 1440,133 1440,400 1440,400 Z");
    }

    100% {
        d: path("M 0,400 C 0,400 0,133 0,133 C 124.33492822966508,144.57894736842104 248.66985645933016,156.1578947368421 335,168 C 421.33014354066984,179.8421052631579 469.6555023923445,191.94736842105263 548,182 C 626.3444976076555,172.05263157894737 734.7081339712918,140.05263157894737 830,124 C 925.2918660287082,107.94736842105263 1007.511961722488,107.8421052631579 1107,112 C 1206.488038277512,116.1578947368421 1323.244019138756,124.57894736842104 1440,133 C 1440,133 1440,400 1440,400 Z");
    }
}

@keyframes pathAnim-1 {
    0% {
        d: path("M 0,400 C 0,400 0,266 0,266 C 72.22009569377991,284.2200956937799 144.44019138755982,302.4401913875598 254,312 C 363.5598086124402,321.5598086124402 510.4593301435407,322.4593301435407 602,312 C 693.5406698564593,301.5406698564593 729.7224880382776,279.7224880382775 827,280 C 924.2775119617224,280.2775119617225 1082.6507177033493,302.6507177033493 1195,304 C 1307.3492822966507,305.3492822966507 1373.6746411483255,285.67464114832535 1440,266 C 1440,266 1440,400 1440,400 Z");
    }

    25% {
        d: path("M 0,400 C 0,400 0,266 0,266 C 78.7846889952153,270.78468899521533 157.5693779904306,275.5693779904306 257,268 C 356.4306220095694,260.4306220095694 476.5071770334928,240.50717703349284 593,231 C 709.4928229665072,221.49282296650716 822.4019138755981,222.40191387559807 902,238 C 981.5980861244019,253.59808612440193 1027.8851674641148,283.88516746411483 1112,291 C 1196.1148325358852,298.11483253588517 1318.0574162679427,282.0574162679426 1440,266 C 1440,266 1440,400 1440,400 Z");
    }

    50% {
        d: path("M 0,400 C 0,400 0,266 0,266 C 81.98086124401911,299.07177033492826 163.96172248803822,332.14354066985646 255,313 C 346.0382775119618,293.85645933014354 446.13397129186603,222.49760765550232 536,221 C 625.866028708134,219.50239234449768 705.5023923444975,287.866028708134 812,311 C 918.4976076555025,334.133971291866 1051.8564593301435,312.0382775119617 1161,297 C 1270.1435406698565,281.9617224880383 1355.0717703349283,273.98086124401914 1440,266 C 1440,266 1440,400 1440,400 Z");
    }

    75% {
        d: path("M 0,400 C 0,400 0,266 0,266 C 109.75119617224877,278.77511961722485 219.50239234449754,291.55023923444975 309,298 C 398.49760765550246,304.44976076555025 467.7416267942584,304.57416267942585 566,284 C 664.2583732057416,263.42583732057415 791.5311004784688,222.1531100478469 903,218 C 1014.4688995215312,213.8468899521531 1110.1339712918661,246.81339712918663 1197,261 C 1283.8660287081339,275.1866028708134 1361.933014354067,270.5933014354067 1440,266 C 1440,266 1440,400 1440,400 Z");
    }

    100% {
        d: path("M 0,400 C 0,400 0,266 0,266 C 72.22009569377991,284.2200956937799 144.44019138755982,302.4401913875598 254,312 C 363.5598086124402,321.5598086124402 510.4593301435407,322.4593301435407 602,312 C 693.5406698564593,301.5406698564593 729.7224880382776,279.7224880382775 827,280 C 924.2775119617224,280.2775119617225 1082.6507177033493,302.6507177033493 1195,304 C 1307.3492822966507,305.3492822966507 1373.6746411483255,285.67464114832535 1440,266 C 1440,266 1440,400 1440,400 Z");
    }
}
</style>
<style lang="scss">
.el-popper {
    padding: 6px;
}
</style>