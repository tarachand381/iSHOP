const { generateUniqueImageName } = require('../helper');
const ProductModel = require('../modules/productModel');
const categoryModel = require('../modules/categoryModel');
const { unlinkSync, existsSync } = require('fs');

class productController {
    async get(id, query = {}) {
        try {
            const filterQuery = {};
            if (query.categorySlug && query.categorySlug !== "null") {
                const category = await categoryModel.findOne({ slug: query.categorySlug });
                if (category) filterQuery["categoryId"] = category._id;
            }
            if (query.productColor && query.productColor !== "null") {
                filterQuery["colors"] = query.productColor;
            }

            if (id == null) {
                const products = await ProductModel.find(filterQuery)
                    .populate(["categoryId", "colors"])
                    .limit(parseInt(query.limit || 0));
                if (!products) throw new Error("Products not found");
                return { msg: "Products found", status: 1, product: products };
            } else {
                const product = await ProductModel.findById(id);
                if (!product) throw new Error("Product not found");
                return { msg: "Product found", status: 1, product };
            }
        } catch (error) {
            throw { msg: error.message || "Internal server error", status: 0 };
        }
    }

    create(data, thumbnail) {
        return new Promise((resolve, reject) => {
            try {
                if (!data.name || !data.slug || !thumbnail) {
                    return reject({ msg: "Please provide all required fields", status: 0 });
                }
                const main_img = generateUniqueImageName(thumbnail.name);
                const destination = './public/product/' + main_img;

                thumbnail.mv(destination, (err) => {
                    if (err) return reject({ msg: "Unable to upload thumbnail", status: 0 });

                    const product = new ProductModel({
                        ...data,
                        colors: JSON.parse(data.colors),
                        thumbnail: main_img
                    });
                    product.save()
                        .then(() => resolve({ msg: "Product created", status: 1 }))
                        .catch(() => reject({ msg: "Unable to create product", status: 0 }));
                });
            } catch (error) {
                reject({ msg: "Internal server error", status: 0 });
            }
        });
    }

    async status(id, flag) {
        try {
            const product = await ProductModel.findById(id);
            if (!product) throw new Error("Product not found");

            const productStatus = {};
            if (flag == 1) productStatus.status = !product.status;
            else if (flag == 2) productStatus.stock = !product.stock;
            else if (flag == 3) productStatus.topSelling = !product.topSelling;

            await ProductModel.updateOne({ _id: id }, { $set: productStatus });
            return { msg: "Status updated", status: 1 };
        } catch (error) {
            throw { msg: error.message || "Internal server error", status: 0 };
        }
    }

    delete(id) {
        return ProductModel.deleteOne({ _id: id })
            .then(() => ({ msg: "Product deleted", status: 1 }))
            .catch(() => { throw { msg: "Unable to delete product", status: 0 }; });
    }

    async update(id, data, file) {
        try {
            const product = await ProductModel.findById(id);
            if (!product) throw new Error("Product not found");

            if (file) {
                const product_img = generateUniqueImageName(file.name);
                const destination = "./public/product/" + product_img;

                await new Promise((resolve, reject) => {
                    file.mv(destination, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                if (product.thumbnail) {
                    const oldImagePath = "./public/product/" + product.thumbnail;
                    if (existsSync(oldImagePath)) {
                        unlinkSync(oldImagePath);
                    }
                }

                await ProductModel.updateOne(
                    { _id: id },
                    {
                        $set: {
                            ...data,
                            colors: JSON.parse(data.colors),
                            thumbnail: product_img
                        }
                    }
                );
            } else {
                await ProductModel.updateOne(
                    { _id: id },
                    {
                        $set: {
                            ...data,
                            colors: JSON.parse(data.colors)
                        }
                    }
                );
            }
            return { msg: "Product updated", status: 1 };
        } catch (error) {
            throw { msg: error.message || "Internal server error", status: 0 };
        }
    }

    async multipleImage(id, productimages) {
        try {
            const Allimages = Array.isArray(productimages) ? productimages : [productimages];
            const product = await ProductModel.findById(id);
            if (!product) throw new Error("Product not found");

            const currentProdImages = product.images ?? [];
            const PromiseUpload = [];

            for (let image of Allimages) {
                const name = generateUniqueImageName(image.name);
                const desti = "./public/product/" + name;
                currentProdImages.push(name);
                PromiseUpload.push(new Promise((res, rej) => {
                    image.mv(desti, err => {
                        if (err) rej(err);
                        else res();
                    });
                }));
            }

            await Promise.all(PromiseUpload);

            await ProductModel.updateOne({ _id: id }, { $set: { images: currentProdImages } });

            return { msg: "Product images added", status: 1 };
        } catch (error) {
            throw { msg: error.message || "Internal server error", status: 0 };
        }
    }
}

module.exports = productController;
