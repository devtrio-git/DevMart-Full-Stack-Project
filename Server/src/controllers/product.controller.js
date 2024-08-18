import { cloudinary } from "../config/cloudinary-config.js";
import { categoryModel } from "../models/category.schema.js";
import { productModel } from "../models/product.schema.js";

export default class Products {
    static async create(req, res) {
        try {
            const { name, price, details, stock, categoryId } = req.body;

            if (!name || !price || !details || !stock || !categoryId) {
                return res.status(400).json({ message: "All fields are required", status: "failed" });
            }

            if (!req.files) {
                return res.status(400).json({ message: "Please upload a products images", status: "failed" });
            }

            const category = await categoryModel.findById(categoryId);
            if (!category) {
                return res.status(400).json({ message: "Category Not Found", status: "failed" });
            }

            const imgUrls = req.files.map(file => file.path);
            const newProduct = new productModel({
                name,
                price,
                details,
                stock,
                categoryId,
                images: imgUrls,
                adminId: req?.user?._id
            })
            await newProduct.save();

            res.status(201).json({ message: "Product created successfully", status: "success", data: newProduct });

        } catch (error) {
            res.status(500).json({ message: "Internal server error", status: "failed", error: error.message });
        }
    }


    static async remove(req, res) {
        try {
            const { id } = req.params;
            const product = await productModel.findById(id);
            if (!product) {
                return res.status(400).json({ message: "Product not found", status: "failed" });
            }

            const publicImgIds = product.images.map(url => {
                const parts = url.split('/');
                const filename = parts[parts.length - 1];
                return filename.split(".")?.[0];
            })

            await cloudinary.api.delete_resources(publicImgIds);
            await productModel.findByIdAndDelete(id);
            res.status(200).json({ message: "Product delete successfully", status: "success", data: product });

        } catch (error) {
            res.status(500).json({ message: "Internal server error", status: "failed", error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price, details, stock, categoryId } = req.body;

            const product = await productModel.findById(id);
            if (!product) {
                return res.status(400).json({ message: "Product not found", status: "failed" });
            }

            if (!name || !price || !details || !stock || !categoryId) {
                return res.status(400).json({ message: "All fields are required", status: "failed" });
            }

            const category = await categoryModel.findById(categoryId);
            if (!category) {
                return res.status(400).json({ message: "Category Not Found", status: "failed" });
            }

            if (categoryId) product.categoryId = categoryId;
            if (name) product.name = name;
            if (price) product.price = price;
            if (details) product.details = details;
            if (stock) product.stock = stock;

            if (req.files && req.files.length > 0) {
                // remove previous save img
                const publicImgIds = product.images.map(url => {
                    const parts = url.split('/');
                    const filename = parts[parts.length - 1];
                    return filename.split(".")?.[0];
                })

                await cloudinary.api.delete_resources(publicImgIds);
                // update new save files paths
                const imgUrls = req.files.map(file => file.path);
                product.images = imgUrls;
            }

            await product.save();
            res.status(200).json({ message: "Product update successfully", status: "success", data: product });

        } catch (error) {
            res.status(500).json({ message: "Internal server error", status: "failed", error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 10;

            const skip = (page - 1) * size;
            const limit = size;

            const data = await productModel.find()
                .skip(skip)
                .limit(limit);

            const totalProducts = await productModel.countDocuments();
            const totalPages = Math.ceil(totalProducts / size);


            res.status(200).json({
                message: "All categories fetched successfully",
                status: "success",
                products: data,
                pagination: {
                    totalProducts,
                    totalPages,
                    currentPage: page,
                    pageSize: size
                }

            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", status: "failed" });
        }
    }


}

