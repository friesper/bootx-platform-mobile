import { get } from '@/util/request'

export function iamgePreview(id: string) {
  return get('/file/preview/' + id, null)
}
export function getUpLoadOptions() {
  return get('/file/getTempCredentials', null)
}
