import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { IArticle } from '../types/store'
import { $axios } from '../utils/api'

@Module({
  name: 'article',
  namespaced: true,
  stateFactory: true
})
export default class ArticleStore extends VuexModule {
  /**
   * Array list of data
   *
   * @type {IArticle[]}
   */
  public data: IArticle[] = []

  /**
   * List of data
   *
   * @type {IArticle}
   */
  public list: IArticle = {}

  /**
   * Is loading state
   *
   * @type {boolean}
   */
  public isLoading: boolean = false

  /**
   * Get all data mutation
   *
   * @param {IArticle[]} data
   * @returns {void}
   */
  @Mutation
  public getAllArticleMutation (data: IArticle[]): void {
    this.data = data
  }

  /**
   * Get data by id mutation
   *
   * @param {IArticle} list
   * @returns {void}
   */
  @Mutation
  public getArticleByIdMutation (list: IArticle): void {
    this.list = list
  }

  /**
   * Insert data mutation
   *
   * @param {IArticle} params
   * @returns {void}
   */
  @Mutation
  public insertArticleMutation (params: IArticle): void {
    this.data.concat(params)
  }

  /**
   * Update data by id mutation
   *
   * @param {IArticle} params
   * @returns {void}
   */
  @Mutation
  public updateArticleMutation (params: IArticle): void {
    const index = this.data.findIndex((data: IArticle) => data.id === params.id)
    if (index) {
      this.data.splice(index, 1, params)
    }
  }

  /**
   * Delete data by id mutation
   *
   * @param {number} id
   * @returns {void}
   */
  @Mutation
  public deleteArticleMutation (id: number): void {
    this.data.filter((data: IArticle) => data.id !== id)
  }

  /**
   * Set loading mutation
   *
   * @param {boolean} isLoading
   * @returns {void}
   */
  @Mutation
  public setLoadingMutation (isLoading: boolean): void {
    this.isLoading = isLoading
  }

  /**
   * Get all data action
   *
   * @returns {Promise<IArticle[]>}
   */
  @Action({ rawError: true })
  public async getAllArticleAction (): Promise<IArticle[]> {
    this.setLoadingMutation(true)
    const { data } = await $axios.get('/posts?_limit=20')
    this.getAllArticleMutation(data)
    this.setLoadingMutation(false)
    return data
  }

  /**
   * Get data by id action
   *
   * @returns {Promise<IArticle>}
   */
  @Action({ rawError: true })
  public async getArticleByIdAction (id: number): Promise<IArticle> {
    this.setLoadingMutation(true)
    const { data } = await $axios.get(`/posts/${id}`)
    this.getArticleByIdMutation(data)
    this.setLoadingMutation(false)
    return data
  }

  /**
   * Insert data action
   *
   * @param {IArticle} params
   * @returns {Promise<IArticle>}
   */
  @Action({ rawError: true })
  public async insertArticleAction (params: IArticle): Promise<IArticle> {
    this.setLoadingMutation(true)
    const { data } = await $axios.post('/posts', params)
    this.insertArticleMutation(data)
    this.setLoadingMutation(false)
    return data
  }

  /**
   * Update data by id action
   *
   * @param {IArticle} params
   * @returns {Promise<IArticle>}
   */
  @Action({ rawError: true })
  public async updateArticleAction (params: IArticle): Promise<IArticle> {
    this.setLoadingMutation(true)
    const { data } = await $axios.put(`/posts/${params.id}`, params)
    this.updateArticleMutation(data)
    this.setLoadingMutation(false)
    return data
  }

  /**
   * Deletedata by id action
   *
   * @param {number} id
   * @returns {Promise<IArticle>}
   */
  @Action({ rawError: true })
  public async deleteArticleAction (id: number): Promise<IArticle> {
    this.setLoadingMutation(true)
    const { data } = await $axios.delete(`/posts/${id}`)
    this.deleteArticleMutation(id)
    this.setLoadingMutation(false)
    return data
  }
}
