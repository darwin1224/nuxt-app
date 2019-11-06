<template>
  <div>
    <b-row>
      <b-col cols="4">
        <b-card border-variant="secondary" header="Update Article" header-border-variant="secondary" header-class="text-center">
          <b-form @submit.prevent="onUpdate">
            <b-form-group label="Title">
              <b-form-input v-model="articleBody.title" type="text" required placeholder="Enter Title" />
            </b-form-group>
            <b-form-group label="Body">
              <b-form-input v-model="articleBody.body" type="text" required placeholder="Enter Body" />
            </b-form-group>
            <div class="float-right">
              <nuxt-link to="/article">
                <b-button type="button" variant="secondary">
                  Cancel
                </b-button>
              </nuxt-link>
              <b-button type="submit" variant="primary" :disabled="isLoading">
                {{ isLoading ? 'Updating' : 'Update' }}
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { IArticle } from '@/types/store'
import ArticleStore from '@/store/article'

@Component({
  name: 'ArticleCreate'
})
export default class extends Vue {
  /**
   * Store module instance
   *
   * @type {ArticleStore}
   */
  private article: ArticleStore = getModule(ArticleStore, this.$store)

  /**
   * Is loading state
   *
   * @type {boolean}
   */
  private get isLoading (): boolean {
    return this.article.isLoading
  }

  /**
   * Article body params
   *
   * @type {IArticle}
   */
  private articleBody: IArticle = {
    title: '',
    body: ''
  }

  /**
   * Created hook
   *
   * @returns {Promise<void>}
   */
  public async created (): Promise<void> {
    await this.getById()
  }

  /**
   * Get data by id
   *
   * @returns {Promise<void>}
   */
  private async getById (): Promise<void> {
    const data = await this.article.getArticleByIdAction(Number(this.$route.params.id))
    this.articleBody = { ...data }
  }

  /**
   * Insert data
   *
   * @returns {Promise<any>}
   */
  public async onUpdate (): Promise<void> {
    try {
      const id = Number(this.$route.params.id)
      await this.article.updateArticleAction({ ...this.articleBody, id })
      this.$router.push('/article')
    } catch (err) {
      throw new Error(err)
    }
  }
}
</script>
