import { request } from '../request'
import { GithubIssueItem, GithubIssueParams } from '~/interface/application/complex.interface'

/** The api to get github issues */
export const getGithubIssue = (data: GithubIssueParams) =>
  request<GithubIssueItem[]>('get', 'https://api.github.com/repos/ant-design/ant-design-pro/issues', data)

/** The api to get total issues */
export const getTotalIssue = (data: any) =>
  request<GithubIssueItem[]>('get', 'https://api.github.com/repos/ant-design/ant-design-pro/issues?per_page=1', data)
