import { AppDataSource } from "./data-source";
import { Category } from './entity/Category';
AppDataSource.initialize().then(async () => {
    const categoryRepository = AppDataSource.getTreeRepository(Category);
    //保存根节点
    const root = new Category();
    root.name = 'Root';
    await categoryRepository.save(root);

    const child1 = new Category();
    child1.name = 'Child1';
    child1.parent = root
    await categoryRepository.save(child1);

    const grandson1 = new Category();
    grandson1.name = 'Child1-Grandson1';
    grandson1.parent = child1
    await categoryRepository.save(grandson1);


    const child2 = new Category();
    child2.name = 'Child2';
    child2.parent = root
    await categoryRepository.save(child2);

    //查询所有的分类
    const find = await categoryRepository.find();
    console.log('find', find);
    //查询分类树
    const findTrees = await categoryRepository.findTrees();
    console.log('findTrees', findTrees);
    //查询根分类
    const findRoots = await categoryRepository.findRoots();
    console.log('findRoots', findRoots);
    //查询祖先树
    const findAncestorsTree = await categoryRepository.findAncestorsTree(grandson1);
    console.log('findAncestorsTree', findAncestorsTree);
    //查询祖先
    const findAncestors = await categoryRepository.findAncestors(grandson1);
    console.log('findAncestors', findAncestors);
    //查询后代树
    const findDescendantsTree = await categoryRepository.findDescendantsTree(root);
    console.log('findDescendantsTree', findDescendantsTree);
    //查询后代
    const findDescendants = await categoryRepository.findDescendants(root);
    console.log('findDescendants', findDescendants);
    //查询后代的数量
    const countDescendants = await categoryRepository.countDescendants(root);
    console.log('countDescendants', countDescendants);
    //查询祖先的数量
    const countAncestors = await categoryRepository.countAncestors(grandson1);
    console.log('countDescendants', countAncestors);

})
