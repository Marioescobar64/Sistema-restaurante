import Product from './product-model.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive, categoria } = req.query;

    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive;
    if (categoria) filter.categoria = { $regex: categoria, $options: 'i' };

    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: Number(limit),
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos',
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });

    res.status(200).json({ success: true, data: product });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener producto', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      data: product,
    });

  } catch (error) {
    res.status(400).json({ success: false, message: 'Error al crear producto', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });

    res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente',
      data: product,
    });

  } catch (error) {
    res.status(400).json({ success: false, message: 'Error al actualizar producto', error: error.message });
  }
};

export const changeProductStatus = async (req, res) => {
  try {
    const isActive = req.url.includes('/activate');

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!product)
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });

    res.status(200).json({
      success: true,
      message: `Producto ${isActive ? 'activado' : 'desactivado'} correctamente`,
      data: product,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al cambiar estado', error: error.message });
  }
};