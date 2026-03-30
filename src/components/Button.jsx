const Button = (props) => {
    const {classes, text} = props;
    return (
        <div className={`${classes} rounded-sm w-fit px-4 py-2 font-bold`}>
            {text}
        </div>
    )
}

export default Button