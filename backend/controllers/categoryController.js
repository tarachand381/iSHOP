const { generateUniqueImageName } = require('../helper');
const categoryModel = require('../modules/categoryModel');
const productModel = require('../modules/productModel');
const { unlinkSync } = require('fs');

class categoryController {
    create(data, categoryImage) {
        return new Promise((resolve, reject) => {
            try {
                if (!data.name || !data.slug || !categoryImage) {
                    reject(
                        {
                            msg: "Please provide all required fields",
                            status: 0
                        }
                    )
                    return
                }
                const category_img = generateUniqueImageName(categoryImage.name)
                const destination = './public/category/' + category_img

                categoryImage.mv(
                    destination,
                    (err) => {
                        if (err) {
                            reject(
                                {
                                    msg: "Unable to upload category image",
                                    status: 0
                                }
                            )
                        } else {

                            const category = new categoryModel({
                                name: data.name,
                                slug: data.slug,
                                category_image: category_img
                            })

                            category.save().then(
                                () => {
                                    resolve(
                                        {
                                            msg: "Category created",
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                () => {
                                    reject(
                                        {
                                            msg: "Unable to create category",
                                            status: 0
                                        }
                                    )

                                }
                            )


                        }


                    }
                )


            } catch (error) {
                reject(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })
    }

    get(id = null) {
        return new Promise(async (resolve, reject) => {
            try {
                if (id) {
                    const category = await categoryModel.findById(id);
                    if (!category) return reject({ msg: "Unable to find category", status: 0 });

                    return resolve({ msg: "Category found", status: 1, category });
                } else {
                    const categories = await categoryModel.find();
                    const data = await Promise.all(categories.map(async (cat) => {
                        const productCount = await productModel.countDocuments({ categoryId: cat._id });
                        return { ...cat.toJSON(), productCount };
                    }));

                    return resolve({ msg: "Categories found", status: 1, category: data });
                }
            } catch {
                reject({ msg: "Internal server error", status: 0 });
            }
        });
    }

    status(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const category = await categoryModel.findById(id);
                    if (category) {
                        categoryModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    status: !category.status
                                }
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "Status updated",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to update status",
                                        status: 0
                                    }
                                )
                            }
                        )

                    }


                } catch (error) {
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )

    }

    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    categoryModel.deleteOne(
                        {
                            _id: id
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Category deleted",
                                    status: 1
                                }
                            )

                        }
                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Unable to delete category",
                                    status: 0
                                }
                            )

                        }
                    )

                } catch (error) {
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    update(id, data, files) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const category = await categoryModel.findById(id);
                    if (files) {
                        //update all category data
                        const category_img = generateUniqueImageName(files.name);
                        const destination = "./public/category/" + category_img;
                        files.mv(
                            destination,
                            (err) => {
                                if (err) {
                                    reject(
                                        {
                                            msg: "Unable to upload file",
                                            status: 0
                                        }
                                    )
                                } else {
                                    unlinkSync("./public/category/" + category.category_image)
                                    categoryModel.updateOne(
                                        {
                                            _id: id
                                        },
                                        {
                                            $set: {
                                                name: data.name,
                                                slug: data.slug,
                                                category_image: category_img
                                            }
                                        }
                                    ).then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "category update",
                                                    status: 1
                                                }
                                            )
                                        }

                                    ).catch(
                                        () => {
                                            reject(
                                                {
                                                    msg: "Unable to update category"
                                                }
                                            )
                                        }
                                    )

                                }
                            }
                        )

                    } else {
                        //update only category name and slug
                        categoryModel.updateOne(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    name: data.name,
                                    slug: data.slug
                                }
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "category update",
                                        status: 1
                                    }
                                )
                            }

                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to update category"
                                    }
                                )
                            }
                        )

                    }

                } catch (error) {
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )

    }
}

module.exports = categoryController;
