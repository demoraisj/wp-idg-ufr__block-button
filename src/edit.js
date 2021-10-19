import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	UFRBlockHeader,
	UFRInput,
	UFRSelect,
	UFRIconPicker,
} from 'wp-idg-ufr__block-components';
import './editor.scss';
import { Fragment } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit( { attributes, setAttributes, isSelected } ) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */
	const { type, style, size, text, icon, position, link } = attributes;
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
	/**
	 * Opções para a seleção de um tipo de botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const typeOptions = [
		{
			label: 'Padrão',
			value: '',
		},
		{
			label: 'Circular',
			value: 'circle',
		},
		{
			label: 'Bloco (Ocupa todo o espaço horizontal disponível)',
			value: 'block',
		},
	];
	/**
	 * Opções para a seleção de um estilo de botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const styleOptions = [
		{
			label: 'Cores Principais',
			value: 'primary',
		},
		{
			label: 'Cores Secundárias',
			value: 'secondary',
		},
		{
			label: 'Fundo Transparente',
			value: '',
		},
	];
	/**
	 * Opções para a seleção do tamanho do botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const sizeOptions = [
		{
			label: 'Médio',
			value: '',
		},
		{
			label: 'Pequeno',
			value: 'small',
		},
		{
			label: 'Grande',
			value: 'large',
		},
	];
	/**
	 * Opções para configuração de posição do botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const positioningOptions = [
		{
			label: 'Esquerda',
			value: 'text-left',
		},
		{
			label: 'Centro',
			value: 'text-center',
		},
		{
			label: 'Direita',
			value: 'text-right',
		},
	];

	/**
	 * Renderiza o conteúdo. Esconde as configurações do bloco quando ele não está selecionado.
	 *
	 * @param { boolean } selected
	 * @return {JSX.Element} Elemento principal condicional
	 */
	function ConditionalMainContentRender( selected ) {
		return selected ? (
			<div
				{ ...useBlockProps( {
					className: 'edit block-responsive ufr-block-component',
				} ) }
			>
				<div className="row align-items-center">
					<div className="col config">
						<UFRBlockHeader
							title="Botão"
							subtitle="Configure a aparenência do botão abaixo."
						/>

						<UFRSelect
							label="Escolha o Tipo do Botão"
							options={ typeOptions }
							value={ type }
							attr="type"
							setter={ setAttributes }
						/>

						<UFRSelect
							label="Escolha o Estilo do Botão"
							options={ styleOptions }
							value={ style }
							attr="style"
							setter={ setAttributes }
						/>

						<UFRSelect
							label="Escolha o Tamanho do Botão"
							options={ sizeOptions }
							value={ size }
							attr="size"
							setter={ setAttributes }
						/>

						<UFRInput
							label="Texto do Botão"
							value={ text }
							attr="text"
							setter={ setAttributes }
						/>

						<UFRInput
							label="Link para Navegar ao Clicar"
							value={ link }
							attr="link"
							setter={ setAttributes }
						/>

						<UFRIconPicker setter={ setAttributes } />
					</div>

					<div className="row preview">
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a
							className={ btnClassName }
							type="button"
							href="javascript:void(0)"
						>
							<i className={ iconClassName } />
							{ text }
						</a>
					</div>
				</div>
			</div>
		) : (
			<div
				{ ...useBlockProps( {
					className: 'show block-responsive ufr-block-component',
				} ) }
			>
				<div className={ blockRowClassName }>
					<div className="col-12">
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a
							className={ btnClassName }
							type="button"
							href="javascript:void(0)"
						>
							<i className={ iconClassName } />
							{ text }
						</a>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Fragment>
			<InspectorControls key="setting">
				<div id="ufrControls">
					<fieldset>
						<UFRSelect
							label="Posição Horizontal do Botão"
							options={ positioningOptions }
							value={ position }
							attr="position"
							setter={ setAttributes }
						/>
					</fieldset>
				</div>
			</InspectorControls>
			{ ConditionalMainContentRender( isSelected ) }
		</Fragment>
	);
}
