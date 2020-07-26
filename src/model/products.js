import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        category: {
            type: String,
            required: [true, "category is required"]
        },
        price: {
            type: Number,
            required: [true, "price is required"]
        },
        inMagazine: {
            blocked: {
                type: Number,
                required: [true, "blocked number is required"],
                min: 0
            },
            inStock: {
                type: Number,
                required: [true, "in stock number is required"],
                min: 0
            }
        },
        shortDescription: {
            type: String,
            required: [true, "short description is required"]
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type: Date,
            default: Date.now()
        },
    }
);


//ProductSchema.index({ name: "text", category: "text", shortDescription: "text" })
export default mongoose.model("products", ProductSchema);