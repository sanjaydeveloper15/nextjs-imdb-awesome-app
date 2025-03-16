import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import placeHolderImg from '../assets/svg/placeholder-300x400.svg';

const MovieCardComp = ({
    isFooterBlurred = false,
    className = "",
    header,
    imageSrc,
    altText = "Card Image",
    footerContent,
    onButtonClick,
    buttonText = "Notify Me"
}) => {
    return (
        <Card isFooterBlurred className={`relative ${className} movie-card`} key={header?.key || "default-key"}>
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{header.subtitle}</p>
            </CardHeader>
            <Image
                removeWrapper
                alt={altText}
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={imageSrc || placeHolderImg}  // Fallback if no poster
            />
            <CardFooter className={`${isFooterBlurred ? "bg-white/30" : "bg-transparent"
                } bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between flex items-center p-4`} >
                <div>
                    {footerContent}
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm" onClick={onButtonClick}>
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>

    );
};

// PropTypes DataType Validations
MovieCardComp.propTypes = {
    isFooterBlurred: PropTypes.bool,
    className: PropTypes.string,
    header: PropTypes.shape({
        subtitle: PropTypes.string,
        title: PropTypes.string,
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    imageSrc: PropTypes.string,
    altText: PropTypes.string,
    footerContent: PropTypes.node,
    onButtonClick: PropTypes.func,
    buttonText: PropTypes.string,
};

export default MovieCardComp;
