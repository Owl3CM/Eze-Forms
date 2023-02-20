const StoryModle = (Component, title = Component.displayName) => {
  return {
    story: {
      title: `Examples/${title}`,
      component: Component,
      parameters: { layout: 'fullscreen' }
    },
    Template: (args) => <Component {...args} />
  }
}
export default StoryModle
