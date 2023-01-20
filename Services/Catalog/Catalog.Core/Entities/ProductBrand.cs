using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog.Core.Entities;

public class ProductBrand
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonElement("Name")]
    public string Name { get; set; }
}