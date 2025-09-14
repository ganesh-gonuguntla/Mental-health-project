import { Resource } from '../models/Resource.js';

export class ResourceController {
  static async getResources(req, res) {
    try {
      const { category, type } = req.query;
      const filters = {};
      
      if (category) filters.category = category;
      if (type) filters.type = type;

      const resources = await Resource.findAll(filters);
      res.json(resources);
    } catch (error) {
      console.error('Get resources error:', error);
      res.status(500).json({ error: 'Failed to get resources' });
    }
  }

  static async getResourceById(req, res) {
    try {
      const { id } = req.params;
      const resource = await Resource.findById(id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      res.json(resource);
    } catch (error) {
      console.error('Get resource by ID error:', error);
      res.status(500).json({ error: 'Failed to get resource' });
    }
  }

  static async createResource(req, res) {
    try {
      const { title, content, type, category } = req.body;
      
      const resource = await Resource.create({
        title,
        content,
        type,
        category
      });

      res.status(201).json(resource);
    } catch (error) {
      console.error('Create resource error:', error);
      res.status(500).json({ error: 'Failed to create resource' });
    }
  }
}
