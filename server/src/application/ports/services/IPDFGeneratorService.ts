export interface IPDFGeneratorService {
    generate(html : string)  : Promise<Readable>
}