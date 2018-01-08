<template>
<el-card class="box-card" style="margin-bottom:10px">
  <div slot="header" class="clearfix">
    <span>React中的样式处理</span>
    <el-button style="float: right; padding: 3px 0" type="text">Read More</el-button>
  </div>
  <div >
    React 组件的生命周期主要通过3个阶段进行管理——mounting、receiveProps、unmounting，他们负责通知组件当前所处的阶段，应该执行生命周期中的哪个步骤。 这3个阶段对应3个方法，分别为：mountComponent、updateComponent 和 unmou ...
  </div>
</el-card>
</template>
<script>
export default {
	data() {
		return {

		}
	}
}
</script>