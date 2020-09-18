const ColorMixin = {
  computed: {
    style: function () {
      return getComputedStyle(document.body)
    }
  },
  methods: {
    getColor: function (name) {
      const color = this.style.getPropertyValue(`--${name}-color`)
      const color_rgba = 'rgba(' + color + ', 1.0)'
      return color_rgba
    }
  }
}

const colors = ['primary', 'primary-var', 'secondary', 'secondary-var1', 'secondary-var2']
for (var name of colors) {
    const computed_property = {}

    const name_string = name.replace('-', '_')
    const fn_string = 'return this.getColor("' + name + '")'
    computed_property[name_string] = new Function(name_string, fn_string)

    Object.assign(ColorMixin.computed, computed_property)
}

export default ColorMixin
