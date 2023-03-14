<template>
  <div class="view">
    <div class="content" v-if="true">
      <van-cell class="ui-flex" title="是否上架">
        <van-switch v-model="checked" />
      </van-cell>
    </div>

    <van-dialog v-model="showFormError" title="您提交的参数不规范">
      <ul class="error-list">
        <li v-for="(item, index) in errors" :key="index">{{ index + 1 }}. {{ item }}</li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from 'vant'
import * as qiniu from 'qiniu-js'

export default {
  data() {
    return {
      tabIndex: 0,
      checked: '',
      form: {
        reward: '',
        title: '',
        city: '',
        description: '',
        requires: '',
        categoryId: '',
        categoryName: '',
        tradeWayId: '',
        appType: '',
        appTypeId: '',
        projectType: '',
        projectTypeId: ''
      },
      pickList: [],
      token: '',
      // 分类 picker
      categoryValue: null,
      showCategoryPicker: false,
      // 所在城市 picker
      cityPickerValue: null,
      showCityPicker: false,
      // 表单校验结果
      errors: [],
      showFormError: false,
      showProjectAppPicker: false
    }
  },


  mounted() {
    if (this.$route.query.itemId) {
      this.doGetXzProductItem()
    }
  },

  methods: {
    // 获取商品信息
    async doGetXzProductItem() {
      // try {
      //   let ret = await API.getXzProductItem(this.$route.query.itemId)
      //   if (+ret.retCode === 0) {
      //     this.itemInfo = ret.data
      //     this.form.reward = +this.itemInfo.reward / 100
      //     this.form.title = this.itemInfo.title
      //     this.form.city = this.itemInfo.city
      //     this.form.description = this.itemInfo.description
      //     this.form.requires = this.itemInfo.requires
      //     this.form.categoryId = this.itemInfo.category_id
      //     // this.form.tradeWayId = this.itemInfo.trade_way_id
      //     this.form.appTypeId = this.itemInfo.app_type_id
      //     this.form.projectTypeId = this.itemInfo.project_type_id
      //     this.pickList = this.itemInfo.imgs.map(element => {
      //       return {
      //         url: element,
      //         content: element,
      //         percent: 100
      //       }
      //     })
      //   } else {
      //     Toast(ret.errMsg)
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
    },

    // 创建
    async doCreate() {
      // try {
      //   let imgs = this.pickList.map(element => element.url)
      //   imgs = JSON.stringify(imgs)
      //   const params = {
      //     ...this.form,
      //     imgs: imgs,
      //     reward: +this.form.reward * 100
      //   }
      //   console.log(params)
      //   let ret = await API.createDemand(params)
      //   if (+ret.errCode === 0) {
      //     Toast.success('发布成功')
      //   } else {
      //     Toast(ret.errMsg)
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
    },

    // 修改
    async doUpdateProduct() {
      // try {
      //   let imgs = this.pickList.map(element => element.url)
      //   imgs = JSON.stringify(imgs)
      //   const params = {
      //     ...this.form,
      //     imgs: imgs,
      //     itemId: this.$route.query.itemId,
      //     reward: +this.form.reward * 100
      //   }
      //   let ret = await API.updateXzProduct(params)
      //   if (+ret.errCode === 0) {
      //     Toast.success('发布成功')
      //   } else {
      //     Toast(ret.errMsg)
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
    },

    // 参数校验
    handleSubmit() {
      const form = this.form
      const errors = []
      if (form.title.length < 5) {
        errors.push('标题长度不能小于5')
      }
      if (form.reward.length === 0) {
        errors.push('赏金不能为空')
      }
      if (form.appType.length === 0) {
        errors.push('应用类型不能为空')
      }
      if (form.projectType.length === 0) {
        errors.push('任务类型不能为空')
      }
      // if (form.requires.length === 0) {
      //   errors.push('宝贝成色不能为空')
      // }
      // if (form.categoryId.length === 0) {
      //   errors.push('宝贝分类不能为空')
      // }
      // if (form.tradeWayId.length === 0) {
      //   errors.push('交易方式不能为空')
      // }
      // if (this.pickList.length < 2) {
      //   errors.push('宝贝图片不能小于2张')
      // }
      this.errors = errors
      this.showFormError = !!errors.length
      if (!this.showFormError) {
        this.doCreate()
        // if (this.$route.query.itemId) {
        //   this.doUpdateProduct()
        // } else {
        //   this.doCreateProduct()
        // }
      }
    }
  }
}
</script>
