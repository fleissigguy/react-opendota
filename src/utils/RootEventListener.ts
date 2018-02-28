

export default abstract class RootEventListener {

  static RootIsScrolledDown = false;

  static OnScroll(e){
    const {classList, scrollTop} = e.target as any;
    let isScrolledDown = scrollTop > (window.document.body.clientHeight / 10);
    if (RootEventListener.RootIsScrolledDown != isScrolledDown) {
      RootEventListener.RootIsScrolledDown = isScrolledDown;
      classList[isScrolledDown && 'add' || 'remove']('root-scrolled');
    }

  }

}
