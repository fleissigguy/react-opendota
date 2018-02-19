

export default abstract class RootEventListener {

  static RootIsScrolledDown = false;

  static OnScroll(e){

    let pageBackground = document.querySelector('.page-background') as any;
    const {classList, scrollTop, scrollHeight} = e.target as any;
    if (pageBackground) {
      if (Math.round(((scrollTop) / scrollHeight) * 100) > 55) {
        pageBackground.style.setProperty('background-position-y', '100%');
      } else {
        pageBackground.style.removeProperty('background-position-y');
      }
    }
    let isScrolledDown = scrollTop > (window.document.body.clientHeight / 10);
    if (RootEventListener.RootIsScrolledDown != isScrolledDown) {
      RootEventListener.RootIsScrolledDown = isScrolledDown;
      classList[isScrolledDown && 'add' || 'remove']('root-scrolled');
    }

  }

}
