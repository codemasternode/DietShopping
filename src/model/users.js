import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name can not be empty"],
            minlength: 2,
            maxlength: 50
        },
        surname: {
            type: String,
            required: [true, "surname can not be empty"],
            minlength: 2,
            maxlength: 50
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, "email can not be empty"],
            validate: {
                validator: function (value) {
                    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailRegex.test(value);
                },
                message: props => `${props.value} is not a valid email`
            },
            maxlength: 50,
            unique: true
        },
        password: {
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
        isConfirmed: {
            type: Boolean,
            default: false
        },
        confirmCode: {
            type: String,
            unique: true,
            required: true
        },
        orders: [],
        address_details: {
            country: {
                type: String,
                default: "Polska",
                enum: ["Polska", "Niemcy", "Holandia"]
            },
            street: {
                type: String,
                required: true
            },
            houseNumber: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            }
        },
        isAdmin: {
            required: true,
            default: false,
            type: Boolean
        }
    },
    { strict: false }
);

UserSchema.pre('save', function (next) {
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

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model("users", UserSchema);