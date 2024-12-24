import { Binary, Struct, Float, List, FixedSizeList, DataType } from "apache-arrow";
export type InterleavedCoord = FixedSizeList<Float>;
export type SeparatedCoord = Struct<{
    x: Float;
    y: Float;
}>;
export type Coord = InterleavedCoord;
export type Point = Coord;
export type LineString = List<Coord>;
export type Polygon = List<List<Coord>>;
export type MultiPoint = List<Coord>;
export type MultiLineString = List<List<Coord>>;
export type MultiPolygon = List<List<List<Coord>>>;
export type GeoArrowType = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;
export type WKB = Binary;
/** Check that the given type is a Point data type */
export declare function isPoint(type: DataType): type is Point;
export declare function isLineString(type: DataType): type is LineString;
export declare function isPolygon(type: DataType): type is Polygon;
export declare function isMultiPoint(type: DataType): type is MultiPoint;
export declare function isMultiLineString(type: DataType): type is MultiLineString;
export declare function isMultiPolygon(type: DataType): type is MultiPolygon;
