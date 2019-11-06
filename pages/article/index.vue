<template>
  <div>
    <nuxt-link to="/article/create">
      <b-button variant="primary">
        Add Article
      </b-button>
    </nuxt-link>
    <b-table :items="articles" :fields="fields">
      <template v-slot:cell(action)="data">
        <nuxt-link :to="`/article/${data.index + 1}/edit`">
          <b-button variant="warning">
            Edit
          </b-button>
        </nuxt-link>
        <b-button variant="danger" @click="onDelete(data.index + 1)">
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { IArticle } from '../../types/store'
import ArticleStore from '@/store/article'

@Component({
  name: 'ArticleList'
})
export default class extends Vue {
  /**
   * Store module instance
   *
   * @type {ArticleStore}
   */
  private article: ArticleStore = getModule(ArticleStore, this.$store)

  /**
   * Table fields
   *
   * @type {any[]}
   */
  private fields: any[] = [
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'User ID' },
    { key: 'title', label: 'Title' },
    { key: 'body', label: 'Body' },
    { key: 'action', label: 'Action' }
  ]

  /**
   * List of data
   *
   * @type {IArticle[]}
   */
  private get articles (): IArticle[] {
    return this.article.data
  }

  /**
   * Created hook
   *
   * @returns {Promise<void>}
   */
  public async created (): Promise<void> {
    await this.getAll()
  }

  /**
   * Get all data
   *
   * @returns {Promise<IArticle[]>}
   */
  public getAll (): Promise<IArticle[]> {
    return this.article.getAllArticleAction()
  }

  /**
   * On delete data
   *
   * @param {number} id
   * @returns {Promise<any>}
   */
  public async onDelete (id: number): Promise<any> {
    if (confirm('Are you sure you want to delete this data')) {
      await this.article.deleteArticleAction(id)
    }
  }
}
</script>
