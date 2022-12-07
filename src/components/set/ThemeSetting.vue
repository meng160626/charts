<template>
    <Teleport to="#app">
        <div :class="{'mask': true, 'hidden': !visible}">
            <div class="theme-setting-container">
                <header>
                    <span>主题设置</span>
                </header>
                <section>
                    <div class="theme-check module">
                        <span class="title">主题</span>
                        <fieldset class="checkbox-group">
                            <div class="checkbox">
                                <label class="checkbox-wrapper">
                                    <input type="checkbox" class="checkbox-input"/>
                                    <span class="checkbox-tile">
                                        <i class="checkbox-icon dew"></i>
                                        <span class="checkbox-label">清新</span>
                                    </span>
                                </label>
                            </div>
                            <div class="checkbox">
                                <label class="checkbox-wrapper">
                                    <input type="checkbox" class="checkbox-input"/>
                                    <span class="checkbox-tile">
                                        <i class="checkbox-icon mew"></i>
                                        <span class="checkbox-label">梦幻</span>
                                    </span>
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div class="diy-box module">
                        <span class="title">自定义主题</span>
                        <div>

                        </div>
                    </div>
                </section>
                <footer>
                    <button class="custom-btn">
                        <span>保存</span>
                        <span>保存</span>
                    </button>
                    <button class="custom-btn">
                        <span>取消</span>
                        <span>取消</span>
                    </button>
                </footer>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const visible = ref(false);

const open = function() {
    visible.value = true;
}

defineExpose({open});
</script>

<style scoped lang='scss'>
@keyframes apear {
    0% {
        transform: scale(.6);
    }
    70% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes cover {
    0% {
    background: rgba($color: #fff, $alpha: 0);
    }
    100% {
    background: rgba($color: #fff, $alpha: .4);
    }
}
.mask {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    background: rgba($color: #fff, $alpha: .4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    color: #333;
    animation: cover .6s forwards ease-in-out;

    &.hidden {
        display: none;

        .theme-setting-container {
            display: none;
        }
    }
}
.theme-setting-container {
    width: 1080px;
    height: 800px;
    box-shadow: 0 0 3px 3px var(--borderColor);
    border-radius: 16px;
    background: #FFF;
    animation: apear .6s forwards ease-in-out;

    header {
        text-align: center;
        height: 80px;
        line-height: 80px;
        position: relative;
        border-bottom: 1px solid var(--borderColor);
        font-size: 38px;
        font-family: var(--fontFamily);
    }

    section {
        height: calc(100% - 140px);
        box-sizing: border-box;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 16px;

        .module {
            .title {
                font-size: 30px;
                font-family: var(--fontFamily);
                display: flex;
                gap: .6em;

                &::before {
                    display: inline-block;
                    width: 8px;
                    height: 30px;
                    content: '';
                    background: var(--borderColor);
                }
            }
        }
        .theme-check {
            width: 100%;
            *,
            *:after,
            *:before {
                box-sizing: border-box;
            }

            .checkbox-group {
                display: flex;
                flex-wrap: wrap;
                border-width: 0;
            }
            .checkbox-group > * {
                margin: 0.5rem 0.5rem;
            }

            .checkbox-input {
                clip: rect(0 0 0 0);
                -webkit-clip-path: inset(100%);
                        clip-path: inset(100%);
                height: 1px;
                overflow: hidden;
                position: absolute;
                white-space: nowrap;
                width: 1px;
            }
            .checkbox-input:checked + .checkbox-tile {
                border-color: var(--borderColor);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                color: var(--borderColor);
            }
            .checkbox-input:checked + .checkbox-tile:before {
                transform: scale(1);
                opacity: 1;
                background-color: var(--borderColor);
                border-color: var(--borderColor);
            }
            .checkbox-input:checked + .checkbox-tile .checkbox-icon, .checkbox-input:checked + .checkbox-tile .checkbox-label {
                color: var(--borderColor);
            }
            .checkbox-input:focus + .checkbox-tile {
                border-color: var(--borderColor);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
            }
            .checkbox-input:focus + .checkbox-tile:before {
                transform: scale(1);
                opacity: 1;
            }

            .checkbox-tile {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 7rem;
                min-height: 7rem;
                border-radius: 0.5rem;
                border: 2px solid #b5bfd9;
                background-color: #fff;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                transition: 0.15s ease;
                cursor: pointer;
                position: relative;
            }
            .checkbox-tile:before {
                content: "";
                position: absolute;
                display: block;
                width: 1.25rem;
                height: 1.25rem;
                border: 2px solid #b5bfd9;
                background-color: #fff;
                border-radius: 50%;
                top: 0.25rem;
                left: 0.25rem;
                opacity: 0;
                transform: scale(0);
                transition: 0.25s ease;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
                background-size: 12px;
                background-repeat: no-repeat;
                background-position: 50% 50%;
            }
            .checkbox-tile:hover {
                border-color: var(--borderColor);
            }
            .checkbox-tile:hover:before {
                transform: scale(1);
                opacity: 1;
            }
            .checkbox-icon {
                display: inline-block;
                width: 3rem;
                height: 3rem;
                background: linear-gradient(45deg, var(--waveColoeDeep), var(--waveColoeLight));
                border-radius: 5px;
            }

            .checkbox-label {
                color: #707070;
                transition: 0.375s ease;
                text-align: center;
            }
        }
    }

    footer {
        width: 100%;
        box-sizing: border-box;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 160px;
        border-top: 1px solid var(--borderColor);

        .custom-btn {
            width: 130px;
            height: 40px;
            color: #fff;
            border-radius: 5px;
            padding: 10px 25px;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
                7px 7px 20px 0px rgba(0,0,0,.1),
                4px 4px 5px 0px rgba(0,0,0,.1);
            outline: none;
            position: relative;
            right: 20px;
            bottom: 20px;
            border:none;
            box-shadow: none;
            width: 130px;
            height: 40px;
            line-height: 42px;
            -webkit-perspective: 230px;
            perspective: 230px;

            span {
                background: rgb(0,172,238);
                background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
                display: block;
                position: absolute;
                width: 130px;
                height: 40px;
                box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
                7px 7px 20px 0px rgba(0,0,0,.1),
                4px 4px 5px 0px rgba(0,0,0,.1);
                border-radius: 5px;
                margin:0;
                text-align: center;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                -webkit-transition: all .3s;
                transition: all .3s;

                &:nth-child(1) {
                    box-shadow:
                        -7px -7px 20px 0px #fff9,
                        -4px -4px 5px 0px #fff9,
                        7px 7px 20px 0px #0002,
                        4px 4px 5px 0px #0001;
                    -webkit-transform: rotateX(90deg);
                    -moz-transform: rotateX(90deg);
                    transform: rotateX(90deg);
                    -webkit-transform-origin: 50% 50% -20px;
                    -moz-transform-origin: 50% 50% -20px;
                    transform-origin: 50% 50% -20px;
                }
                &:nth-child(2) {
                    -webkit-transform: rotateX(0deg);
                    -moz-transform: rotateX(0deg);
                    transform: rotateX(0deg);
                    -webkit-transform-origin: 50% 50% -20px;
                    -moz-transform-origin: 50% 50% -20px;
                    transform-origin: 50% 50% -20px;
                }
            }

            &:hover span {
                &:nth-child(1) {
                    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
                        7px 7px 20px 0px rgba(0,0,0,.1),
                        4px 4px 5px 0px rgba(0,0,0,.1);
                    -webkit-transform: rotateX(0deg);
                    -moz-transform: rotateX(0deg);
                    transform: rotateX(0deg);
                }
                &:nth-child(2) {
                    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
                        7px 7px 20px 0px rgba(0,0,0,.1),
                        4px 4px 5px 0px rgba(0,0,0,.1);
                    color: transparent;
                    -webkit-transform: rotateX(-90deg);
                    -moz-transform: rotateX(-90deg);
                    transform: rotateX(-90deg);
                }
            }
        }
    }
}
</style>