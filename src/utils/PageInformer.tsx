export default abstract class PageInformer {
  private static pageDescriptionSelector?: HTMLDivElement;

  static setPageInfo(title?: string, description?: string) {
    if (title) {
      document.querySelector('title').text = title + ' | MOBA';
    }
    if (!PageInformer.pageDescriptionSelector){
      PageInformer.pageDescriptionSelector = document.querySelector('.page-description') as HTMLDivElement;
    }
    if(description) {
      document.querySelector('meta[name="description"]').setAttribute('content', description);
      PageInformer.pageDescriptionSelector.innerText = description;
    }
  }

}
