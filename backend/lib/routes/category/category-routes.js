const Category = require('../../models/category-schema');
const dbUtils = require('../../utilities/db-utils');
const ensureAuth = require('../../auth/ensure-auth');

async function getCategories(ctx, next) {
  const categories = await dbUtils.findAllDocuments(Category);

  ctx.response.body = {
    categories: categories
  };

  await next();
}

async function addCategory(ctx, next) {
  const category = await dbUtils.makeNewDocument(Category, ctx.request.body);

  ctx.response.body = {
    category: {
      _id: category._id,
      category: category
    }
  };

  await next();
}

async function updateCategory(ctx, next) {
  const category = await dbUtils.updateDocument(Category, ctx.request.body._id, { name: ctx.request.body.name });
  console.log('category: ', category);
  const updatedCategory = await category.save();

  ctx.response.body = {
    category: {
      _id: updatedCategory._id,
      name: updatedCategory.name
    }
  };

  await next();
}

async function deleteCategory(ctx) {
  const id = await dbUtils.splitUrl(ctx.request.url);
  const category = await dbUtils.findOneDocument(Category, { _id: id });

  //TODO: make sure there are no notes in this category before deletion

  const confirm =  await dbUtils.deleteDocument(Category, id);
  if(confirm) {
    ctx.response.body = {
      message: `The category ${category.name} has been deleted.`
    };
  }
}

module.exports = (router) => {
  router.get('/', ensureAuth, getCategories);
  router.post('/add', ensureAuth, addCategory);
  router.patch('/update', ensureAuth, updateCategory);
  router.delete('/:id', ensureAuth, deleteCategory);
};
