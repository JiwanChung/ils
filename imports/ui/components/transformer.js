var transformer = require('delta-transform-html');
transformer.Registry.add('size', SizeClass);

const TreeNode = transformer.Registry.get('TreeNode');
class SizeClass extends TreeNode {
  openTag() {
    let mine = {};
    switch(this.attributes.size) {
      case small:
        mine = 0.5;
        break;
      case large:
        mine = 1.5;
        break;
      case huge:
        mine = 2.0;
        break;
      case false:
        mine = 1.0;
        break;
      default:
        mine = 1.0;
        break;
    }
    return '<span '+ 'style=\"font-size: '+this.attributes.header+'rem\"' +'>';
  }
  closeTag() {
    return '</span>';
  }
}
FormatterClass.priority = 44

export const Transformer = transformers;
