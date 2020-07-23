import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        inMagazine: {
            blocked: {
                type: Number,
                required: true,
                min: 0
            },
            inStock: {
                type: Number,
                required: true,
                min: 0
            }
        },
        shortDescription: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type: Date,
            default: Date.now()
        },
    },
    { strict: false }
);

ProductSchema.pre('save', function (next) {
    var company = this;
    company.updated_at = Date.now();
    if (company.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(company.password, salt, function (err, hash) {
                if (err) return next(err);
                company.password = hash;
                next();
            });
        });
    }
});

ProductSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model("products", ProductSchema);