<template>
    <main class="type-btn-list">
        <div 
            v-for="item, idx in groupList[active]" 
            :key="idx"
            :class="{'type-btn': true, 'active': groupList[active][idx].active}">
            <img
                src="../assets/images/type-btn-light.png"
                class="type-btn-light"
            />
            <span @click="onTabClick(idx)">{{ item.text }}</span>
        </div>
    </main>
</template>

<script setup lang='ts'>
import type { TGroupItem } from 'env';
import { reactive } from 'vue';

const props = defineProps({
    groupList: {
        type: Array<Array<TGroupItem>>,
        required: true
    },
    active: {
        type: Number,
        required: true
    }
});
const emits = defineEmits(['update:btn-list']);

const onTabClick = function(idx: number) {
    const _groupList = props.groupList;
    _groupList[props.active][idx].active = !_groupList[props.active][idx].active;
    emits('update:btn-list', _groupList);
}

</script>

<style scoped lang="scss">
.type-btn-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: unset;
    .type-btn {
        font-weight: 700;
        color: #FFFFFF;
        text-shadow: 1px 1px 1px #004870;
        letter-spacing: 4px;
        opacity: .8;
        position: relative;
        transition: all .2s linear;
        pointer-events: all;

        span {
            font-size: 20px;
            width: 115px;
            height: 37px;
            display: block;
            background-image: url(../assets/images/type-btn-default.png);
            text-align: center;
            line-height: 37px;
            cursor: pointer;
            position: relative;
            &.small {
                font-size: 18px;
            }
        }

        .type-btn-light {
            display: none;
            position: absolute;
            top: -20px;
            right: -30px;
            width: 133px;
            height: 102px;
        }

        &.active {
            opacity: 1;
            filter: brightness(130%);

            .type-btn-light {
                display: block;
            }
        }
        &:hover {
            transform: translateX(20px);
        }
    }
}
</style>