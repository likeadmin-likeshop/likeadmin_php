<template>
    <div class="home">
		<div :style="{color: styleConfig.primary}">{{cartNum}}</div>
        <el-button type="primary" @click="addCartNum">主要按钮</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

@Component({
    components: {},
	watch: {
		cartNum(val) {
			console.log(val)
		}
	}
})
export default class Home extends Vue {
	@Getter('cartNum') cartNum!: number
	@Mutation('addCartNum') addCartNum!: () => void
    created() {
        console.log(this.cartNum, )
    }
	
}
</script>

