<script>
export default {
  name: "MenuItem",
  functional: true, // functional 为true表示这是一个函数组件，不需要template
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  // 函数组件需要通过render来渲染模板内容
  // 类组件： <templte>
  // 函数组件： functional: true, 没有this，只通过props接收数据渲染数据
  // 函数组件渲染速度要比类组件快
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
