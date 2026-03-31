import CTAButton from "./CTAButton"
import HighlightText from "./HighlightText"

const CodeSection = ({ heading, description, ctabtn1, ctabtn2, reverse, elipseColor }) => {
    const code = `<!DOCTYPE html>
<html>
<head><title>Example</
title><link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a>
</h1>
<nav><a href="one/">One</a><a href="two/">Two</
a><a href="three/">Three</a>
</nav>`
    return (
        <div className={`font-inter my-20 flex-col text-white flex md:flex-row w-[90%] justify-around ${reverse ? "md:flex-row-reverse flex-col-reverse" : ""} `}>
            {/* Text Section */}
            <div className="w-[45%] flex flex-col justify-around">
                <div className="flex flex-col gap-4">
                    <h3 className="text-4xl font-semibold flex flex-wrap gap-2">
                        {
                            heading.map((item, index) => {
                                return <span key={index}>
                                    {item.highlight ? (
                                        <HighlightText>{item.text}</HighlightText>
                                    ): (
                                        item.text
                                    )}
                                </span>
                            })
                        }
                    </h3>
                    <p className="text-richblack-300">{description}</p>
                </div>
                <div className="flex gap-3">
                    <CTAButton arrow text={ctabtn1.text} linkTo={ctabtn1.linkTo} variant="secondary" />
                    <CTAButton text={ctabtn2.text} linkTo={ctabtn2.linkTo} variant="primary" />
                </div>
            </div>
            {/* Code block */}
            <div className="relative min-w-[45%] pl-4">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-linear-to-r from-[#0E1A2D3D] to-[#111E3261]`}></div>

                {/* overloay for code block */}
                <div className='absolute blur-2xl -top-7 -left-7'>
                    <div className={`w-90 h-50 opacity-50 rounded-full mx-auto bg-${elipseColor}`}></div>
                </div>

                {/* Blur overlay */}
                <div className="absolute inset-0 backdrop-blur-2xl bg-white/1"></div>

                {/* Content */}
                <pre className="relative z-10 text-white w-full">
                    {code}
                </pre>
            </div>
        </div>
    )
}

export default CodeSection