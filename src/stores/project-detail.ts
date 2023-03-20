import type {
  AddCommentDTO,
  AddReplyDTO,
  CommentItemVo,
  ProjectItemVo,
  QueryCommentListDTO,
  QueryReplyListDTO,
  ReplyItemVo
} from '@/service/auto-service/types'
import { addComment, addReply, queryCommentList, queryReplyList } from '@/service/auto-service/评论模块'
import { CommentTopicTypeEnum } from '@/types/enum'
import { defineStore, acceptHMRUpdate } from 'pinia'
import * as ProjectAPI from '@/service/auto-service/项目模块'

export const useProjectDetailStore = defineStore('user', {
  state: () => ({
    detail: null as null | ProjectItemVo,
    comments: [] as CommentItemVo[],
    isEdit: false,
    speakCommentInfo: null as null | CommentItemVo,
    speakReply: null as null | ReplyItemVo
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

    queryReplyList (comment_id: number, props: QueryReplyListDTO) {
      const current = this.comments.find((it) => it.id === comment_id);
      return queryReplyList({
        comment_id,
        ...props,
      }).then((res) => {
        current.reply_info.has_more = res.data.has_more;
        current.reply_info.list = [...current.reply_info.list, ...res.data.list]
        current.reply_info.total = res.data.total
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
      this.$patch({ isEdit: true })
    },

    hideEdit() {
      this.$patch({ isEdit: false })
    },

    // 回复评论
    replyToComment(props: AddReplyDTO) {
      addReply(props)
    },

    // 清楚回复信息
    clearSpeakId() {
      this.$patch({ speakReply: null, speakCommentInfo: null })
    },

    // 回复另一个回复
    setSpeakReplay(data: ReplyItemVo) {
      this.$patch({ speakReply: data })
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
