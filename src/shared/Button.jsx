export default function Button({
  className,
  title,
  children,
  type = "button",
  bgTransparent = false,
  fullWidth = false,
  iconBtn = false,
  onClick = (e) => e.stopPropagation(),
}) {
  // TODO: Edit colors according to theme properties.
  const bgTransparentPropClassName = `${
    bgTransparent ? " bg-transparent" : " bg-white"
  }`;
  const fullWidthPropClassName = `${fullWidth ? " w-full" : " w-max"}`;
  const iconBtnPropClassName = `${
    iconBtn
      ? " hover:text-orange-500 active:text-orange-700"
      : " hover:bg-orange-300 active:bg-orange-500"
  }`;
  const customClassName = `${className ? " " + className : ""}`;
  const propsClassNames = `${bgTransparentPropClassName}${fullWidthPropClassName}${iconBtnPropClassName}${customClassName}`;

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 h-min rounded-md py-2 px-4 transition-colors${propsClassNames}`}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
