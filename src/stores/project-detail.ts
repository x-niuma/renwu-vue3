import type {
  AddCommentDTO,
  AddReplyDTO,
  CommentItemVo,
  ProjectItemVo,
  QueryCommentListDTO,
  ReplyItemVo
} from '@/service/auto-service/types'
import { addComment, addReply, queryCommentList } from '@/service/auto-service/评论模块'
import { CommentTopicTypeEnum } from '@/types/enum'
import { defineStore, acceptHMRUpdate } from 'pinia'
import * as ProjectAPI from '@/service/auto-service/项目模块'

export const useProjectDetailStore = defineStore('user', {
  state: () => ({
    detail: null as null | ProjectItemVo,
    comments: [] as CommentItemVo[],
    isEdit: false,
    speakCommentInfo: null as null|CommentItemVo,
    speakReply: null as null|ReplyItemVo
  }),
  actions: {
    async queryDetail(projectId: number) {
      let res = await ProjectAPI.queryDetail({
        id: projectId
      })
      this.$patch({ detail: res.data })
    },
    async getComments(props: QueryCommentListDTO) {
      const res = await queryCommentList({
        topic_id: props.topic_id,
        topic_type: CommentTopicTypeEnum.project
      })
      this.$patch({
        comments: res.data.list
      })
    },
    addComment(props: AddCommentDTO) {
      addComment(props).then((res) => {
        this.$patch({
          comments: [res.data, ...this.comments]
        })
      })
    },
    showEdit() {
      this.$patch({
        isEdit: true
      })
    },
    hideEdit() {
      this.$patch({
        isEdit: false
      })
    },
    addReply() {},

    // 回复评论
    replyToComment(props: AddReplyDTO) {
      addReply(props)
    },

    clearSpeakId() {
      // this.$patch({ speakReplyId: undefined, speakCommentId: undefined })
    },

    // 回复另一个回复
    setSpeakReplay(data: ReplyItemVo) {
      this.$patch({ speakReply: data})
    },

    // 回复另一个评论
    setSpeakComment(data: CommentItemVo) {
      this.$patch({ speakCommentInfo: data })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectDetailStore, import.meta.hot))
}
