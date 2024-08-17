import { categoryModel } from "../models/category.schema.js";

export default class Catergories {
    static async create(req, res) {
        try{
            if(!req.file){
                return res.status(400).json({message: "Please upload a file", status: "failed"});
            }
            const {name} = req.body;

            if(!name){
                return res.status(400).json({message: "All fields are required", status: "failed"});
            }

            const newCategory = new categoryModel({
                name,
                image: req?.file?.path,
                adminId: req?.user?._id
            })
            await newCategory.save();

            res.status(201).json({message: "Category created successfully", status: "success", data: newCategory});

        }catch(error){
            res.status(500).json({message: "Internal server error", status: "failed"});
        }
    }

    static async getAll(req,res){
        try {
            const data = await categoryModel.find();
            res.status(200).json({message: "All categories fetched successfully", status: "success", data});
        } catch (error) {
            res.status(500).json({message: "Internal server error", status: "failed"});
        }
    }

    static async deleteOne(req,res){
        try {
            const id = req.params?.id;
            if(!id){
                return res.status(400).json({message: "Missing category id", status: "failed"});
            }
            const category = await categoryModel.findByIdAndDelete(id);
            
            if(!category){
                return res.status(404).json({message: "Category not found", status: "failed"});
            }
            
            res.status(200).json({message: "Category deleted successfully", status: "success", data: category});

        } catch (error) {
            res.status(500).json({message: "Internal server error", status: "failed"});
        }
    }

}

