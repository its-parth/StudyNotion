import CTAButton from "./CTAButton"
const CodeSection = ({ heading, description, btn1Txt, btn2Txt, reverse }) => {
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
        <div className={`font-inter my-20 text-white flex md:flex-row w-[90%] justify-around ${reverse ? "md:flex-row-reverse" : ""}`}>
            {/* Text Section */}
            <div className="w-[45%] flex flex-col justify-around">
                <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-semibold">{heading}</h3>
                    <p className="text-richblack-300">{description}</p>
                </div>
                <div className="flex gap-3">
                    <CTAButton text={"Try It Yourself"} variant="secondary" />
                    <CTAButton text={"Learn More"} variant="primary" />
                </div>
            </div>
            {/* Code block */}
            <div className="relative w-[45%] pl-4">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-linear-to-r from-[#0E1A2D3D] to-[#111E3261]"></div>

                {/* overloay for code block */}
                <div className='absolute blur-2xl -top-7 -left-7'>
                    <div className='w-90 h-50 bg-blue-300 opacity-80 rounded-full mx-auto'></div>
                </div>

                {/* Blur overlay */}
                <div className="absolute inset-0 backdrop-blur-2xl bg-white/1"></div>

                {/* Content */}
                <pre className="relative z-10 text-white">
                    {code}
                </pre>
            </div>
        </div>
    )
}

export default CodeSection