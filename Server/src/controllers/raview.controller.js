import { orderModel } from "../models/order.schema.js";
import { productModel } from "../models/product.schema.js";
import { reviewModel } from "../models/review.schema.js";

const updateProductRating = async (productId) => {
    const reviews = await reviewModel.find({ productId });
    const totalRatings = reviews.length ?? 0;
    const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round(sumRatings / totalRatings);
    await productModel.findByIdAndUpdate(productId, { rating: averageRating });
};

const validateUserOrder = async ({ userId, productId }) => {
    const orders = await orderModel.find({
        userId,
        products: { $elemMatch: { id: productId } },
    });
    return orders.length > 0;
};
export default class ReviewsRating {
    static async create(req, res) {
        try {
            const { review, rating, productId } = req.body;
            if (!productId || !rating, !review) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            const hasOrdered = await validateUserOrder({
                userId: req.user._id,
                productId,
            });

            if (!hasOrdered) {
                return res.status(403).json({ message: "Access denied, you have not purchased this product" });
            }

            const newReview = new reviewModel({
                review,
                rating,
                productId,
                userId: req?.user?._id,
            });

            await newReview.save();
            await updateProductRating(productId);
            res.status(201).json({ message: "Rating submitted successfully." });
        } catch (error) {
            res.status(500).json({ message: "Error submitting rating.", error: error.message });
        }
    }
    static async remove(req, res) {
        try {
            const { id } = req.params;
            const review = await reviewModel.findById(id);
            if (!review) {
                return res.status(404).json({ message: "Review not found." });
            }

            if (review.userId.toString() !== req?.user?._id.toString()) {
                return res.status(404).json({ message: "Access denied, you are not authorized user" });
            }

            const { productId } = review;
            await reviewModel.findByIdAndDelete(id);
            await updateProductRating(productId);

            res.status(200).json({ message: "Review deleted successfully." });
        } catch (error) {
            res.status(500).json({ message: "Error deleting review.", error: error.message });
        }
    }
    static async getProductReviews(req, res) {
        try {
            const { productId } = req.params;
            const product = await productModel.findById(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            const reviews = await reviewModel.find({ productId }).populate("userId", "name");
            res.status(200).json({ message: "Reviews fetched successfully.", reviews });
        } catch (error) {
            res.status(500).json({ message: "Error fetching reviews.", error: error.message });
        }
    }
}