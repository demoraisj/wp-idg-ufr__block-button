import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */
	const { icon, type, style, size, text, link, position } = attributes;

	/**
	 * Classe do ícone do botão. Contem margem quando o ícone é acompanhado de texto
	 *
	 * @type {string}
	 */
	const iconClassName = `${ icon } ${ text.length !== 0 ? 'mr-1' : '' }`;

	/**
	 * Classe do botão, define seu tipo, estilo e tamanho
	 *
	 * @type {string}
	 */
	const btnClassName = `br-button ${ type } ${ style } ${ size }`;

	/**
	 * Classe da linha que envolve o bloco. Define a posição dinamicamente.
	 *
	 * @type {string}
	 */
	const blockRowClassName = `row align-items-center ${ position }`;

	return (
		<div { ...useBlockProps.save() }>
			<div className={ blockRowClassName }>
				<div className="col-12">
					<a
						type="button"
						className={ btnClassName }
						href={
							link.startsWith( 'http' )
								? link
								: link
								? `//${ link }`
								: 'javascript:void(0)'
						}
					>
						<i className={ iconClassName } />
						{ text }
					</a>
				</div>
			</div>
		</div>
	);
}
