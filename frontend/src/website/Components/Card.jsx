import React from "react";

const Card = ({ image, title }) => {
    return (
        <div className="max-w-lg rounded overflow-hidden shadow-lg mt-8">
            <img className="w-[400px] h-[290px]  object-cover" src={image} alt={title} />
            <div className=" text-center px-6 py-3">
                <div className="font-bold text-xl ">{title}</div>
            </div>
        </div>
    );
};

const CardList = () => {

    const cards = [
        { image: "https://cdn.pixabay.com/photo/2019/04/27/06/22/beats-4159345_640.jpg", title: "Headphone" },
        { image: "https://cdn.pixabay.com/photo/2022/05/20/23/09/apple-7210383_640.jpg", title: "Apple" },
        { image: "https://cdn.pixabay.com/photo/2023/02/14/09/49/ai-generated-7789176_640.jpg", title: "Coffee" },
        { image: "https://cdn.pixabay.com/photo/2023/03/04/20/07/coffee-7830087_640.jpg", title: "Clock" },
        { image: "https://cdn.pixabay.com/photo/2018/08/03/06/02/aromatherapy-3581133_640.jpg", title: "Suger" },
        { image: "https://cdn.pixabay.com/photo/2023/04/26/16/21/cherries-7952771_640.jpg", title: "Strawberry" },
        { image: "https://cdn.pixabay.com/photo/2020/10/03/07/36/pineapple-5622824_640.jpg", title: "Pineapple" },
        { image: "https://cdn.pixabay.com/photo/2024/02/25/15/48/product-display-stand-8596009_640.jpg", title: "Garden" },
        { image: "https://cdn.pixabay.com/photo/2024/06/02/17/00/smoothie-8804683_640.jpg", title: "Fruit Shake" },
        { image: "https://cdn.pixabay.com/photo/2024/04/06/16/19/green-8679581_640.jpg", title: "Green Apple" },
        { image: "https://cdn.pixabay.com/photo/2021/09/17/12/12/coffee-6632524_640.jpg", title: "Coffee bean" },
        { image: "https://cdn.pixabay.com/photo/2015/10/06/13/53/bears-974462_640.jpg", title: "Teddy Bear" },
        { image: "https://cdn.pixabay.com/photo/2022/04/02/17/18/purple-flower-7107429_640.jpg", title: "Blue Flower" },
        { image: "https://cdn.pixabay.com/photo/2023/06/28/12/43/flower-8094368_640.jpg", title: "White Flower" },
        { image: "https://cdn.pixabay.com/photo/2014/04/10/11/24/rose-320868_640.jpg", title: "Rose Flower" },
        { image: "https://cdn.pixabay.com/photo/2014/04/10/11/24/rose-320868_640.jpg", title: "Rose Flower" },
        { image: "https://cdn.pixabay.com/photo/2023/04/26/16/21/cherries-7952771_640.jpg", title: "Strawberry" },
        { image: "https://cdn.pixabay.com/photo/2023/03/04/20/07/coffee-7830087_640.jpg", title: "Clock" },
        { image: "https://cdn.pixabay.com/photo/2022/05/20/23/09/apple-7210383_640.jpg", title: "Apple" },
        { image: "https://cdn.pixabay.com/photo/2020/10/03/07/36/pineapple-5622824_640.jpg", title: "Pineapple" },




    ];

    return (
        <div className="flex mt-3 gap-8 flex-wrap justify-center">
            {cards.map((card, index) => (
                <Card key={index} image={card.image} title={card.title} />
            ))}
        </div>
    );
};

export default CardList;
