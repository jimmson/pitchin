// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'mongoose'.
const mongoose = require('mongoose');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createErro... Remove this comment to see the full error message
const createError = require('http-errors');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  needsAddress: Boolean,
  organisation: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: String,
  status: {
    archived: {
      type: Boolean,
      default: false,
    },
  },
});

const CategoryModel = mongoose.model('category', categorySchema);

export class Category {
  data: any;
  id: any;
  constructor(id: any) {
    this.data = {};
    this.id = id;
  }
  // Add a new category
  async add(fields: any) {
    for (const [key, value] of Object.entries(fields)) {
      this.data[key] = value;
    }
    // todo: fields.createdBy = current user
    const category = new CategoryModel(this.data);
    const newCategory = await category.save();
    return {
      id: newCategory._id,
    };
  }
  // Get all categories
  async list(consumer: any) {
    const result = await CategoryModel.find();
    if (consumer === 'public') {
      const list = result.map((el: any) => {
        if (!el.status.archived) {
          const category = {
            name: el.name,
            _id: el._id,
            needsAddress: el.needsAddress,
            organisation: el.organisation,
          };
          return category;
        }
      });
      return list;
    }
    return {
      status: 'ok',
      categories: result,
    };
  }

  // Get a single category
  async get() {
    const category = await CategoryModel.findById(this.id);
    if (category) {
      return category;
    } else {
      const err = createError(404, {
        status: 'error',
        message: 'Not found',
      });
      throw err;
    }
  }

  // Update category
  async update(fields: any) {
    for (const [key, value] of Object.entries(fields)) {
      this.data[key] = value;
    }
    await CategoryModel.updateOne(
      {
        _id: this.id,
      },
      {
        ...this.data,
      },
    );
    return {
      status: 'ok',
      message: 'Updated',
      fields: {
        ...this.data,
      },
    };
  }

  // Remove a category
  async delete() {
    console.log(`[d] Trying to remove category "${this.id}"`);
    const res = await CategoryModel.deleteOne({
      _id: this.id,
    });
    if (res.ok === 1) {
      if (res.n) {
        return {
          status: 'ok',
        };
      } else {
        const err = createError(404, {
          status: 'error',
          message: 'Not found',
        });
        throw err;
      }
    }
  }
}
